from enum import Enum
from typing import Optional, List

from pydantic.main import BaseModel

from models import FlashCard, Pile


class Languages(str, Enum):
    en = "English"
    nl = "Dutch"


class CreatePileModel(BaseModel):
    name: str
    original_language: Optional[Languages] = Languages.en
    translation_language: Optional[Languages] = Languages.nl


class CreateFlashCardModel(BaseModel):
    original_language: Optional[Languages] = Languages.en
    translation_language: Optional[Languages] = Languages.nl
    original: str
    translation: str
    example: Optional[str]
    description: Optional[str]


class PileFlashCards(BaseModel):
    pile: Pile
    flashcards: List[FlashCard]


class DeleteFlashCardFromPileModel(BaseModel):
    id: str
    flashcard_id: str
