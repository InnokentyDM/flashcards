import logging
from typing import List

from fastapi import APIRouter, Depends, HTTPException

from api.v1.models import (CreatePileModel, PileFlashCards,
                           CreateFlashCardModel, DeleteFlashCardFromPileModel)
from models import Pile, FlashCard
from services.flashcards import FlashCardService, get_flashcard_service
from services.piles import PilesService, get_pile_service

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get('/')
async def get_pile(pile_service: PilesService = Depends(
    get_pile_service)):
    response = await pile_service.all()
    return response


@router.get('/{id}', response_model=Pile)
async def get_flashcard_by_id(id: str, pile_service: PilesService = Depends(
    get_pile_service)):
    response = await pile_service.get(id)
    if response:
        return response
    raise HTTPException(404, f'Flashcard with id {id} not found')


@router.post('/', response_model=Pile)
async def create_pile(create_pile: CreatePileModel, pile_service: PilesService = Depends(
    get_pile_service)):
    pile = Pile(**create_pile.dict())
    response = await pile_service.create(pile)
    if response:
        return response
    raise HTTPException(400, 'Something went wrong or Bad request')


@router.delete('/{id}')
async def delete_pile(id: str, flashcard_service: FlashCardService =
Depends(get_flashcard_service), pile_service: PilesService = Depends(
    get_pile_service)):
    pile = await pile_service.get(id)
    # TODO: refactor for mass delete
    for flashcard_id in pile.flashcards_ids:
        await flashcard_service.delete(flashcard_id)
    response = await pile_service.delete(pile.id)
    return response


@router.get('/{id}/flashcards')
async def get_flashcards(id: str, flashcard_service: FlashCardService =
Depends(
    get_flashcard_service), pile_service: PilesService = Depends(get_pile_service)):
    pile = await pile_service.get(id)
    flashcards = await flashcard_service.filter_by_ids(pile.flashcards_ids)
    pile_flashcards = PileFlashCards(pile=pile, flashcards=flashcards)
    return pile_flashcards


@router.post('/{id}/flashcards')
async def add_flashcards(id: str, flashcards_ids: List[str], pile_service:
PilesService = Depends(get_pile_service)):
    pile = await pile_service.get(id)
    pile.add_flashcards(flashcards_ids)
    await pile_service.update(pile)


@router.post('/delete_flashcard_from_pile')
async def delete_flashcard_from_pile(delete_flashcard_from_pile_model:
DeleteFlashCardFromPileModel,
pile_service:
PilesService = Depends(get_pile_service)):
    pile = await pile_service.get(delete_flashcard_from_pile_model.id)
    pile.delete_flashcard(delete_flashcard_from_pile_model.flashcard_id)
    response = await pile_service.update(pile)
    return response


@router.post('/{id}')
async def add_flashcard(id: str, create_flashcard: CreateFlashCardModel,
                        pile_service: PilesService = Depends(
                            get_pile_service),
                        flashcard_service: FlashCardService = Depends(
                            get_flashcard_service)):
    pile = await pile_service.get(id)

    flashcard = FlashCard(**create_flashcard.dict())
    created_flashcard = await flashcard_service.create(flashcard)
    pile.add_flashcards([created_flashcard.id])
    response = await pile_service.update(pile)
    return response
