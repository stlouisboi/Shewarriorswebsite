from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class PrayerRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    first_name: Optional[str] = Field(default=None, max_length=80)


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
