import logging.config
import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    MONGODB_URL: str
    MONGODB_NAME: str = 'Flashcards'
    MONGODB_FLASHCARDS_COLLECTION_NAME: str = 'flashcards'
    MONGODB_PILES_COLLECTION_NAME: str = 'piles'

    DEBUG: bool = True

    LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    LOG_DEFAULT_HANDLERS = ['console', ]

    # Применяем настройки логирования
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'verbose': {
                'format': LOG_FORMAT
            },
            'default': {
                '()': 'uvicorn.logging.DefaultFormatter',
                'fmt': '%(levelprefix)s %(message)s',
                'use_colors': None,
            },
            'access': {
                '()': 'uvicorn.logging.AccessFormatter',
                'fmt': "%(levelprefix)s %(client_addr)s - '%(request_line)s' %(status_code)s",
            },
        },
        'handlers': {
            'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'formatter': 'verbose',
            },
            'default': {
                'formatter': 'default',
                'class': 'logging.StreamHandler',
                'stream': 'ext://sys.stdout',
            },
            'access': {
                'formatter': 'access',
                'class': 'logging.StreamHandler',
                'stream': 'ext://sys.stdout',
            },
        },
        'loggers': {
            'uvicorn.error': {
                'level': 'INFO',
            },
            'uvicorn.access': {
                'handlers': ['access'],
                'level': 'INFO',
                'propagate': False,
            },
        },
        'root': {
            'level': os.environ.get('LOG_LEVEL'),
            'formatter': 'verbose',
            'handlers': LOG_DEFAULT_HANDLERS,
        },
    }
    logging.config.dictConfig(LOGGING)


settings = Settings()
