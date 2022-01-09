import { useState, useEffect } from 'react';

// API
import API from '../API';

// Types
import { FlashCardModel, PileModel } from "../models";

const initialState = {
    pile: {} as PileModel,
    flashcards: [] as FlashCardModel[]
};

export const useFlashCardsFetch = (pileId: string) => {
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const fetchFlashCards = async () => {
        try {
            setError(false);
            const response = await API.piles.fetchFlashCardsForPile(pileId);
            setState({ ...response });
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        fetchFlashCards();
        setIsChanged(false);
    }, [pileId, isChanged]);

    return { state, error, setIsChanged };
};