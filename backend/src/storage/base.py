from abc import ABC, abstractmethod
from typing import List


class AbstractStorage(ABC):
    @abstractmethod
    async def fetch_by_id(self, id: str) -> dict:
        pass

    @abstractmethod
    async def fetch_all(self) -> List[dict]:
        pass

    @abstractmethod
    async def create(self, data: dict) -> dict:
        pass

    @abstractmethod
    async def delete(self, id: str) -> int:
        pass

    @abstractmethod
    async def update(self, id: str, data: dict):
        pass


class MongoDBStorage(AbstractStorage):
    @abstractmethod
    async def filter_by_field(self, field_name: str, field_value) -> List[
        dict]:
        pass

    @abstractmethod
    async def filter_by_ids(self, ids: List[str]) -> List[dict]:
        pass