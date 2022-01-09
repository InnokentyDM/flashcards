import logging
from http.client import HTTPException

from fastapi import APIRouter, Depends

from api.v1.models import CreateFlashCardModel
from models import FlashCard
from services.flashcards import FlashCardService, get_flashcard_service

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get('/')
async def get_flashcard(flashcard_service: FlashCardService = Depends(
    get_flashcard_service)):
    response = await flashcard_service.all()
    return response


@router.get('/{id}', response_model=FlashCard)
async def get_flashcard_by_id(id: str, flashcard_service:
FlashCardService =
Depends(
    get_flashcard_service)):
    response = await flashcard_service.get(id)
    if response:
        return response
    raise HTTPException(404, f'Flashcard with id {id} not found')


@router.post('/', response_model=FlashCard)
async def create_flashcard(create_flashcard: CreateFlashCardModel,
                           flashcard_service:
FlashCardService = Depends(
    get_flashcard_service)):
    flashcard = FlashCard(**create_flashcard.dict())
    response = await flashcard_service.create(flashcard)
    if response:
        return response
    raise HTTPException(400, 'Something went wrong or Bad request')


@router.delete('/{id}')
async def delete_flashcard(id: str, flashcard_service:
FlashCardService = Depends(
    get_flashcard_service)):
    response = await flashcard_service.delete(id)
    if response:
        return 'Successfully deleted flashcard'
    raise HTTPException(404, f'Flashcard with id {id} not found')

# @router.get('/api/word/random', response_model=Word)
# async def get_random_word():
#     response = await fetch_random_word()
#     return response

