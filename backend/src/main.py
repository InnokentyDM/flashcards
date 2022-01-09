import motor.motor_asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1 import flashcards, piles
from settings import settings
from storage import mongodb

app = FastAPI()

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.on_event('startup')
async def startup():
    mongodb.mongo = motor.motor_asyncio.AsyncIOMotorClient(
            settings.MONGODB_URL)


@app.on_event('shutdown')
async def shutdown():
    mongodb.mongo.close()


@app.get('/healthCheck')
def read_root():
    return {'Ping': 'pong'}


app.include_router(flashcards.router, prefix='/api/v1/flashcards', tags=[
    'flashcards'])

app.include_router(piles.router, prefix='/api/v1/piles', tags=['piles'])
