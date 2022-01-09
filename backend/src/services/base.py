from abc import ABC, abstractmethod
from typing import List

from pydantic import BaseModel

from storage.base import MongoDBStorage


class BaseService(ABC):
    def __init__(self, storage: MongoDBStorage):
        self.storage = storage

    @abstractmethod
    async def get(self, id: str) -> BaseModel:
        pass

    @abstractmethod
    async def all(self) -> List[BaseModel]:
        pass

    @abstractmethod
    async def create(self, instance: BaseModel):
        pass

    @abstractmethod
    async def update(self, instance: BaseModel):
        pass

    @abstractmethod
    async def delete(self, id: str):
        pass
