from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
import uuid
from datetime import datetime, timezone, timedelta
import stripe
import asyncio
import resend
import requests as http_requests
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY") or "sk_test_emergent"
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
TAX_MODE = "full"

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "SheWorriers Foundation <onboarding@resend.dev>")
resend.api_key = RESEND_API_KEY

PAYPAL_CLIENT_ID = os.environ.get("PAYPAL_CLIENT_ID", "")
PAYPAL_SECRET = os.environ.get("PAYPAL_SECRET", "")
PAYPAL_BASE = "https://api-m.paypal.com" if os.environ.get("PAYPAL_ENV") == "live" else "https://api-m.sandbox.paypal.com"


def _paypal_token() -> str:
    r = http_requests.post(
        f"{PAYPAL_BASE}/v1/oauth2/token",
        auth=(PAYPAL_CLIENT_ID, PAYPAL_SECRET),
        data={"grant_type": "client_credentials"},
        timeout=20,
    )
    r.raise_for_status()
    return r.json()["access_token"]

EMAIL_WRAPPER = """<div style="background:#2C1E16;padding:40px 20px;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:0 auto;background:#3B222E;border:1px solid #C5A05944;padding:40px;">
    <p style="color:#C5A059;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;">SheWorriers Foundation</p>
    {body}
    <p style="color:#E8E1D580;font-size:12px;margin:32px 0 0;">With love and prayer,<br/>The SheWorriers Sisterhood · Winston-Salem, NC</p>
  </div>
</div>"""


async def send_email(to: str, subject: str, body_html: str):
    if not RESEND_API_KEY:
        logging.getLogger(__name__).warning("RESEND_API_KEY not set; skipping email to %s", to)
        return
    try:
        await asyncio.to_thread(
            resend.Emails.send,
            {"from": SENDER_EMAIL, "to": [to], "subject": subject, "html": EMAIL_WRAPPER.format(body=body_html)},
        )
    except Exception as e:
        logging.getLogger(__name__).error(f"email failed: {e}")


async def send_donation_receipt(session_id: str):
    try:
        s = stripe.checkout.Session.retrieve(session_id)
        email = (s.customer_details or {}).get("email")
        if not email:
            return
        amount = (s.amount_total or 0) / 100
        recurring = s.mode == "subscription"
        body = f"""
    <h1 style="color:#F5F0E6;font-size:26px;font-weight:normal;margin:0 0 16px;">Your gift was received.</h1>
    <p style="color:#E8E1D5;font-size:15px;line-height:1.7;margin:0 0 12px;">
      Thank you, sister. Your {'monthly ' if recurring else ''}gift of <strong style="color:#D4AF37;">${amount:,.2f}</strong>
      just became someone's steady ground — a care circle, a welcome bag, a mentor's hour.
    </p>
    <p style="color:#E8E1D5;font-size:15px;line-height:1.7;margin:0;">
      "Those who look to Him are radiant; their faces are never covered with shame." — Psalm 34:5
    </p>"""
        await send_email(email, "Your gift to SheWorriers was received", body)
    except Exception as e:
        logging.getLogger(__name__).error(f"receipt failed: {e}")


class PrayerRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    first_name: Optional[str] = Field(default=None, max_length=80)


class CheckoutRequest(BaseModel):
    lookup_key: str
    quantity: int = Field(1, ge=1, le=100)
    origin_url: str


class RsvpRequest(BaseModel):
    gathering: str = Field(min_length=1, max_length=120)
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr


class NavigatorRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    contact: str = Field(min_length=1, max_length=200)
    support_seeking: str = Field(min_length=1, max_length=200)
    hardest_right_now: Optional[str] = Field(default=None, max_length=1000)
    contact_method: str = Field(min_length=1, max_length=40)
    preferred_time: str = Field(min_length=1, max_length=80)


class InterestRequest(BaseModel):
    kind: str = Field(min_length=1, max_length=20)  # mentor | volunteer | partner
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    details: dict = Field(default_factory=dict)


class SisterNoteRequest(BaseModel):
    email: EmailStr
    name: Optional[str] = Field(default=None, max_length=120)


@api_router.get("/")
async def root():
    return {"message": "SheWorriers Foundation API"}


@api_router.post("/prayers")
async def create_prayer(input: PrayerRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "first_name": input.first_name,
        "message": input.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.prayer_requests.insert_one(doc)
    return {"ok": True}


@api_router.post("/rsvps")
async def create_rsvp(input: RsvpRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "gathering": input.gathering,
        "name": input.name,
        "email": input.email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.rsvps.insert_one(doc)
    body = f"""
    <h1 style="color:#F5F0E6;font-size:26px;font-weight:normal;margin:0 0 16px;">Your seat is saved, {input.name.split()[0]}.</h1>
    <p style="color:#E8E1D5;font-size:15px;line-height:1.7;margin:0;">
      We're holding a chair for you at <strong style="color:#D4AF37;">{input.gathering}</strong>.
      Come as you are — someone will be waiting to welcome you by name.
    </p>"""
    await send_email(input.email, f"Your seat at {input.gathering} is saved", body)
    return {"ok": True}


@api_router.post("/navigator-requests")
async def create_navigator_request(input: NavigatorRequest):
    doc = {
        "id": str(uuid.uuid4()),
        **input.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.navigator_requests.insert_one(doc)
    if "@" in input.contact:
        body = f"""
    <h1 style="color:#F5F0E6;font-size:26px;font-weight:normal;margin:0 0 16px;">We received your request, {input.name.split()[0]}.</h1>
    <p style="color:#E8E1D5;font-size:15px;line-height:1.7;margin:0;">
      A SheWorriers Care Navigator will reach out by {input.contact_method.lower()} — {input.preferred_time.lower()}.
      You don't have to figure this out alone. One supported step is still a step forward.
    </p>"""
        await send_email(input.contact, "We're here — your Care Navigator request", body)
    return {"ok": True}


@api_router.post("/interest")
async def create_interest(input: InterestRequest):
    if input.kind not in {"mentor", "volunteer", "partner"}:
        raise HTTPException(400, "Invalid interest kind")
    doc = {
        "id": str(uuid.uuid4()),
        **input.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.interest_submissions.insert_one(doc)
    labels = {"mentor": "the Mentor Interest List", "volunteer": "the volunteer team", "partner": "our partner network"}
    body = f"""
    <h1 style="color:#F5F0E6;font-size:26px;font-weight:normal;margin:0 0 16px;">Welcome to the table, {input.name.split()[0]}.</h1>
    <p style="color:#E8E1D5;font-size:15px;line-height:1.7;margin:0;">
      We've received your interest in {labels[input.kind]}. We'll reach out soon about
      current opportunities, orientation, and the next best fit for your gifts.
    </p>"""
    await send_email(input.email, "We received your interest — SheWorriers", body)
    return {"ok": True}


@api_router.post("/sister-note")
async def join_sister_note(input: SisterNoteRequest):
    await db.sister_note_subs.update_one(
        {"email": input.email},
        {"$set": {
            "email": input.email,
            "name": input.name,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }, "$setOnInsert": {
            "id": str(uuid.uuid4()),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )
    body = f"""
    <h1 style="color:#F5F0E6;font-size:26px;font-weight:normal;margin:0 0 16px;">You're on the list{f', {input.name.split()[0]}' if input.name else ''}.</h1>
    <p style="color:#E8E1D5;font-size:15px;line-height:1.7;margin:0;">
      The Sister Note arrives weekly — a gentle letter of faith, care, and community
      updates from the SheWorriers sisterhood. Nothing heavy. Just a soft place to land
      in your inbox between gatherings.
    </p>"""
    await send_email(input.email, "Welcome to The Sister Note", body)
    return {"ok": True}


class PayPalOrderRequest(BaseModel):
    lookup_key: str


DONATION_AMOUNTS = {
    "give_25": 25.0, "give_50": 50.0, "give_100": 100.0, "give_250": 250.0,
}


@api_router.post("/paypal/orders")
async def paypal_create_order(input: PayPalOrderRequest):
    if not PAYPAL_CLIENT_ID or not PAYPAL_SECRET:
        raise HTTPException(503, "PayPal is not configured yet")
    amount = DONATION_AMOUNTS.get(input.lookup_key)
    if not amount:
        raise HTTPException(400, "Unknown donation tier")
    token = await asyncio.to_thread(_paypal_token)

    def _create():
        r = http_requests.post(
            f"{PAYPAL_BASE}/v2/checkout/orders",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={
                "intent": "CAPTURE",
                "purchase_units": [{
                    "reference_id": input.lookup_key,
                    "description": "SheWorriers Foundation Donation",
                    "amount": {"currency_code": "USD", "value": f"{amount:.2f}"},
                }],
            },
            timeout=20,
        )
        r.raise_for_status()
        return r.json()

    order = await asyncio.to_thread(_create)
    await db.payment_transactions.insert_one({
        "session_id": order["id"],
        "provider": "paypal",
        "lookup_key": input.lookup_key,
        "amount": amount,
        "currency": "usd",
        "status": "initiated",
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"order_id": order["id"]}


@api_router.post("/paypal/orders/{order_id}/capture")
async def paypal_capture_order(order_id: str):
    if not PAYPAL_CLIENT_ID or not PAYPAL_SECRET:
        raise HTTPException(503, "PayPal is not configured yet")
    token = await asyncio.to_thread(_paypal_token)

    def _capture():
        r = http_requests.post(
            f"{PAYPAL_BASE}/v2/checkout/orders/{order_id}/capture",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            timeout=20,
        )
        r.raise_for_status()
        return r.json()

    result = await asyncio.to_thread(_capture)
    paid = result.get("status") == "COMPLETED"
    now = datetime.now(timezone.utc).isoformat()
    update = await db.payment_transactions.update_one(
        {"session_id": order_id, "payment_status": {"$ne": "paid"}},
        {"$set": {"status": "completed" if paid else "failed",
                  "payment_status": "paid" if paid else "failed",
                  "updated_at": now}},
    )
    if paid and update.modified_count:
        payer_email = (result.get("payer") or {}).get("email_address")
        record = await db.payment_transactions.find_one({"session_id": order_id})
        if payer_email and record:
            amount = record.get("amount", 0)
            body = f"""
    <h1 style="color:#F5F0E6;font-size:26px;font-weight:normal;margin:0 0 16px;">Your gift was received.</h1>
    <p style="color:#E8E1D5;font-size:15px;line-height:1.7;margin:0 0 12px;">
      Thank you, sister. Your PayPal gift of <strong style="color:#D4AF37;">${amount:,.2f}</strong>
      just became someone's steady ground — a care circle, a welcome bag, a mentor's hour.
    </p>
    <p style="color:#E8E1D5;font-size:15px;line-height:1.7;margin:0;">
      "Those who look to Him are radiant; their faces are never covered with shame." — Psalm 34:5
    </p>"""
            await send_email(payer_email, "Your gift to SheWorriers was received", body)
    return {"status": result.get("status"), "payment_status": "paid" if paid else "failed"}


class PrayerTeamLogin(BaseModel):
    passcode: str = Field(min_length=1, max_length=120)


def _prayer_team_token() -> str:
    payload = {
        "role": "prayer_team",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm="HS256")


def _verify_prayer_team(request: Request):
    auth = request.headers.get("Authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(401, "Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=["HS256"])
        if payload.get("role") != "prayer_team":
            raise HTTPException(401, "Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Session expired — please sign in again")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")


@api_router.post("/prayer-team/login")
async def prayer_team_login(input: PrayerTeamLogin):
    if input.passcode != os.environ.get("PRAYER_TEAM_PASSCODE"):
        raise HTTPException(401, "Incorrect passcode")
    return {"token": _prayer_team_token()}


@api_router.get("/prayer-team/requests")
async def prayer_team_requests(request: Request):
    _verify_prayer_team(request)
    cursor = db.prayer_requests.find({}, {"_id": 0}).sort("created_at", -1).limit(200)
    items = await cursor.to_list(length=200)
    return {"requests": items}
@api_router.post("/payments/checkout")
async def create_checkout(req: CheckoutRequest):
    prices = stripe.Price.list(lookup_keys=[req.lookup_key], active=True, limit=1).data
    if not prices:
        raise HTTPException(500, f"Price not found: {req.lookup_key}")
    price = prices[0]
    kwargs = dict(
        line_items=[{"price": price.id, "quantity": req.quantity}],
        mode="subscription" if price.recurring else "payment",
        success_url=f"{req.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{req.origin_url}/payment/cancel",
        metadata={"lookup_key": req.lookup_key},
    )
    if TAX_MODE == "full":
        try:
            session = stripe.checkout.Session.create(**kwargs, managed_payments={"enabled": True})
        except stripe.error.InvalidRequestError as e:
            msg = (e.user_message or "").lower()
            if "managed payments" in msg or "ineligible" in msg:
                session = stripe.checkout.Session.create(
                    **kwargs, automatic_tax={"enabled": True}, billing_address_collection="required",
                )
            else:
                raise
    else:
        session = stripe.checkout.Session.create(**kwargs)
    await db.payment_transactions.insert_one({
        "session_id": session.id,
        "lookup_key": req.lookup_key,
        "amount": float((price.unit_amount or 0) * req.quantity),
        "currency": price.currency,
        "status": "initiated",
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"checkout_url": session.url, "session_id": session.id}


@api_router.get("/payments/status/{session_id}")
async def get_payment_status(session_id: str):
    record = await db.payment_transactions.find_one({"session_id": session_id})
    if not record:
        raise HTTPException(404, "Transaction not found")
    if record.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                result = await db.payment_transactions.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {"$set": {
                        "status": "completed",
                        "payment_status": "paid",
                        "stripe_payment_intent_id": s.payment_intent,
                        "updated_at": datetime.now(timezone.utc).isoformat(),
                    }},
                )
                if result.modified_count:
                    await send_donation_receipt(session_id)
                record = await db.payment_transactions.find_one({"session_id": session_id})
        except stripe.error.StripeError:
            pass
    return {
        "session_id": record["session_id"],
        "status": record["status"],
        "payment_status": record["payment_status"],
    }


@api_router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(400, "Invalid signature")
    obj, t = event["data"]["object"], event["type"]
    now = datetime.now(timezone.utc).isoformat()
    if t == "checkout.session.completed":
        result = await db.payment_transactions.update_one(
            {"session_id": obj["id"], "payment_status": {"$ne": "paid"}},
            {"$set": {"status": "completed", "payment_status": obj.get("payment_status", "paid"),
                      "stripe_payment_intent_id": obj.get("payment_intent"), "updated_at": now}},
        )
        if result.modified_count:
            await send_donation_receipt(obj["id"])
    elif t == "checkout.session.async_payment_succeeded":
        await db.payment_transactions.update_one(
            {"session_id": obj["id"]}, {"$set": {"payment_status": "paid", "updated_at": now}})
    elif t == "checkout.session.async_payment_failed":
        await db.payment_transactions.update_one(
            {"session_id": obj["id"]}, {"$set": {"status": "failed", "payment_status": "failed", "updated_at": now}})
    elif t == "checkout.session.expired":
        await db.payment_transactions.update_one(
            {"session_id": obj["id"]}, {"$set": {"status": "expired", "payment_status": "expired", "updated_at": now}})
    elif t == "charge.refunded":
        await db.payment_transactions.update_one(
            {"stripe_payment_intent_id": obj.get("payment_intent")},
            {"$set": {"status": "refunded", "payment_status": "refunded", "updated_at": now}})
    return {"status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
