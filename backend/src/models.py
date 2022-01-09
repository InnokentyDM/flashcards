import uuid
from enum import Enum
from typing import Optional, List

from pydantic import BaseModel, Field


class Languages(str, Enum):
    en = "English"
    nl = "Dutch"


class FlashCard(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias='_id')
    original_language: Optional[Languages] = Languages.en
    translation_language: Optional[Languages] = Languages.nl
    original: str
    translation: str
    example: Optional[str]
    description: Optional[str]

    class Config:
        allow_population_by_field_name = True


class Pile(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias='_id')
    name: str
    original_language: Optional[Languages] = Languages.en
    translation_language: Optional[Languages] = Languages.nl
    flashcards_ids: List[str] = []

    class Config:
        allow_population_by_field_name = True

    def add_flashcards(self, flashcards_ids: List[str]):
        if not flashcards_ids:
            return
        self.flashcards_ids = list({*self.flashcards_ids, *flashcards_ids})

    def delete_flashcard(self, flashcard_id: str):
        if not flashcard_id in self.flashcards_ids:
            return
        self.flashcards_ids.remove(flashcard_id)