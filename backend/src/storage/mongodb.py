import motor.motor_asyncio

mongo: motor.motor_asyncio.AsyncIOMotorClient


async def get_mongo() -> motor.motor_asyncio.AsyncIOMotorClient:
    return mongo
