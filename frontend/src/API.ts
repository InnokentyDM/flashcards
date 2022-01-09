import {
    API_URL
} from "./config";
import {FlashCardModel, PileFlashCardsModel, PileModel} from "./models";

const postConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const deleteConfig = {
    method: 'DELETE'
}

const buildUrl = (endpoint: string) => {
    return `${API_URL}/${endpoint}`
}

const _get = async (endpoint: string) => {
    const url = buildUrl(endpoint);
    return await (await fetch(url)).json()
}

const _post = async (endpoint: string, data: object) => {
    const url = buildUrl(endpoint)
    return await (
            await fetch(url, {
                ...postConfig,
                body: JSON.stringify(data)
            })
        ).json()
}

const _delete = async (endpoint: string) => {
    const url = buildUrl(endpoint);
    return await (
            await fetch(url, {
                ...deleteConfig,
            })
        ).json()
}

const apiSettings = {
    flashcards: {
        fetchFlashCards: async (): Promise<FlashCardModel[]> => {
            const endpoint: string = 'flashcards';
            return await _get(endpoint);
        },
        fetchFlashCard: async (id: string): Promise<FlashCardModel> => {
            const endpoint: string = `flashcards/${id}`;
            return await _get(endpoint);
        },
    },
    piles: {
        fetchPiles: async (): Promise<PileModel[]> => {
            const endpoint: string = 'piles';
            return await _get(endpoint);
        },
        addPile: async (formData: {}): Promise<PileModel> => {
            const endpoint: string = 'piles';
            return _post(endpoint, formData);
        },
        deletePile: async (pileId: string): Promise<number> => {
            const endpoint: string = `piles/${pileId}`;
            return await _delete(endpoint);
        },
        fetchFlashCardsForPile: async (id: string): Promise<PileFlashCardsModel> => {
            const endpoint: string = `piles/${id}/flashcards`;
            return await _get(endpoint)
        },
        addFlashCardToPile: async (id: string, formData: {}): Promise<number> => {
            const endpoint: string = `piles/${id}`;
            return await _post(endpoint, {id, ...formData});
        },
        deleteFlashCardFromPile: async (id: string, flashcard_id: string): Promise<number> => {
            const endpoint: string = `piles/delete_flashcard_from_pile`;
            return await _post(endpoint, {id, flashcard_id})
        }
    },
};

export default apiSettings;