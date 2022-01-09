import logging
from functools import lru_cache
from typing import List

import motor.motor_asyncio
from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from pydantic import parse_obj_as

from models import FlashCard
from services.base import BaseService
from settings import settings
from storage.mongodb import get_mongo
from storage.database import MongoDBCollection

logger = logging.getLogger(__name__)


class FlashCardService(BaseService):
    def __init__(self, storage: MongoDBCollection):
        super(FlashCardService, self).__init__(storage=storage)

    async def get(self, id: str) -> FlashCard:
        data = await self.storage.fetch_by_id(id)
        flashcard = FlashCard(**data)
        return flashcard

    async def all(self) -> List[FlashCard]:
        data = await self.storage.fetch_all()
        result = parse_obj_as(List[FlashCard], data)
        return result

    async def create(self, flashcard: FlashCard) -> FlashCard:
        flashcard_data = jsonable_encoder(flashcard)
        data = await self.storage.create(flashcard_data)
        created = FlashCard(**data)
        return created

    async def delete(self, id: str) -> int:
        deleted_count = await self.storage.delete(id)
        return deleted_count

    async def get_by_pile_id(self, id: str) -> List[FlashCard]:
        data = await self.storage.filter_by_field('pile_id', id)
        result = parse_obj_as(List[FlashCard], data)
        return result

    async def filter_by_ids(self, ids: List[str]) -> List[FlashCard]:
        data = await self.storage.filter_by_ids(ids)
        result = parse_obj_as(List[FlashCard], data)
        return result

    async def update(self, flashcard: FlashCard):
        raise NotImplementedError


@lru_cache()
def get_flashcard_service(
        mongodb: motor.motor_asyncio.AsyncIOMotorClient = Depends(get_mongo),
) -> FlashCardService:
    flashcards_storage = MongoDBCollection(mongodb, settings.MONGODB_NAME,
                                               settings.MONGODB_FLASHCARDS_COLLECTION_NAME)
    return FlashCardService(storage=flashcards_storage)