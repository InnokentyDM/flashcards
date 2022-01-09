import logging
from typing import List

import motor.motor_asyncio
from pymongo.results import DeleteResult, InsertOneResult, UpdateResult

from storage.base import MongoDBStorage

logger = logging.getLogger(__name__)


class MongoDBCollection(MongoDBStorage):
    def __init__(self, client: motor.motor_asyncio.AsyncIOMotorClient,
                 database_name: str,
                 collection_name: str):
        self.__collection = client[database_name][collection_name]

    async def fetch_by_id(self, id: str) -> dict:
        document = await self.__collection.find_one({'_id': id})
        return document

    async def fetch_all(self) -> List[dict]:
        results = []
        cursor = self.__collection.find({})
        async for document in cursor:
            results.append(document)
        return results

    async def create(self, data: dict) -> dict:
        new_instance: InsertOneResult = await self.__collection.insert_one(
            data)
        created = await self.fetch_by_id(new_instance.inserted_id)
        return created

    async def update(self, id: str, data: dict):
        update_result: UpdateResult = await self.__collection.update_one({
            '_id': id}, {'$set': data})
        return update_result.modified_count

    async def delete(self, id: str) -> int:
        result: DeleteResult = await self.__collection.delete_one({'_id': id})
        return result.deleted_count

    async def filter_by_field(self, field_name: str, field_value) -> List[dict]:
        results = []
        cursor = self.__collection.find({field_name: field_value})
        async for document in cursor:
            results.append(document)
        return results

    async def filter_by_ids(self, ids: List[str]) -> List[dict]:
        results = []
        cursor = self.__collection.find({'_id': {'$in': ids}})
        async for document in cursor:
            results.append(document)
        return results


    # async def fetch_random_word():
    #     cursor = collection.aggregate([{'$sample': {'size': 1}}])
    #     res = None
    #     async for document in cursor:
    #         res = Word(**document)
    #     return res

