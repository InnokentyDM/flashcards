from functools import lru_cache
from typing import List

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from pydantic import parse_obj_as

from models import Pile
from services.base import BaseService
import motor.motor_asyncio

from settings import settings
from storage.database import MongoDBCollection
from storage.mongodb import get_mongo


class PilesService(BaseService):
    async def get(self, id: str) -> Pile:
        data = await self.storage.fetch_by_id(id)
        pile = Pile(**data)
        return pile

    async def all(self) -> List[Pile]:
        data = await self.storage.fetch_all()
        result = parse_obj_as(List[Pile], data)
        return result

    async def create(self, pile: Pile) -> Pile:
        pile_data = jsonable_encoder(pile)
        data = await self.storage.create(pile_data)
        created = Pile(**data)
        return created

    async def delete(self, id: str) -> int:
        deleted_count = await self.storage.delete(id)
        return deleted_count

    async def update(self, pile: Pile):
        modified_count = await self.storage.update(pile.id, pile.dict())
        return modified_count



@lru_cache()
def get_pile_service(
        mongodb: motor.motor_asyncio.AsyncIOMotorClient = Depends(get_mongo),
) -> PilesService:
    piles_storage = MongoDBCollection(mongodb, settings.MONGODB_NAME,
                                               settings.MONGODB_PILES_COLLECTION_NAME)
    return PilesService(storage=piles_storage)