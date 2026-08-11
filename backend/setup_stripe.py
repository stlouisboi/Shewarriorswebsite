import os
import stripe
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]

CATALOG = [
    {
        "emergent_product_id": "sheworriers_donation",
        "name": "SHE Warriors Foundation Donation",
        "tax_code": "txcd_10000000",
        "prices": [
            {"lookup_key": "give_25", "amount": 2500, "currency": "usd"},
            {"lookup_key": "give_50", "amount": 5000, "currency": "usd"},
            {"lookup_key": "give_100", "amount": 10000, "currency": "usd"},
            {"lookup_key": "give_250", "amount": 25000, "currency": "usd"},
        ],
    },
    {
        "emergent_product_id": "sheworriers_sustainer",
        "name": "SHE Warriors Sustainer Circle (Monthly)",
        "tax_code": "txcd_10000000",
        "prices": [
            {"lookup_key": "sustain_15", "amount": 1500, "currency": "usd", "interval": "month"},
            {"lookup_key": "sustain_25", "amount": 2500, "currency": "usd", "interval": "month"},
            {"lookup_key": "sustain_50", "amount": 5000, "currency": "usd", "interval": "month"},
            {"lookup_key": "sustain_100", "amount": 10000, "currency": "usd", "interval": "month"},
        ],
    },
]


def get_or_create_product(entry):
    for p in stripe.Product.list(active=True).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == entry["emergent_product_id"]:
            return p
    return stripe.Product.create(
        name=entry["name"],
        tax_code=entry.get("tax_code"),
        metadata={"managed_by": "emergent", "emergent_product_id": entry["emergent_product_id"]},
    )


def main():
    account = stripe.Account.retrieve()
    print("sandbox country:", account.get("country"))
    for entry in CATALOG:
        product = get_or_create_product(entry)
        for p in entry["prices"]:
            existing = stripe.Price.list(lookup_keys=[p["lookup_key"]], active=True, limit=1).data
            if existing and (existing[0].unit_amount != p["amount"] or existing[0].currency != p["currency"]):
                stripe.Price.modify(existing[0].id, active=False)
                existing = []
            if not existing:
                kwargs = dict(
                    product=product.id,
                    unit_amount=p["amount"],
                    currency=p["currency"],
                    lookup_key=p["lookup_key"],
                    transfer_lookup_key=True,
                )
                if p.get("interval"):
                    kwargs["recurring"] = {"interval": p["interval"]}
                stripe.Price.create(**kwargs)
                print("created price", p["lookup_key"])
            else:
                print("price exists", p["lookup_key"])
    print("catalog ready")


if __name__ == "__main__":
    main()
