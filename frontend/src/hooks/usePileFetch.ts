import { useState, useEffect } from 'react';

// API
import API from '../API';

// Types
import { PileModel } from "../models";

const initialState ={
    piles: [] as PileModel[]
};

export const usePileFetch = () => {
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const fetchPiles = async () => {
        try {
            setError(false);
            const piles = await API.piles.fetchPiles();
            setState({ piles });
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        fetchPiles();
        setIsChanged(false);
    }, [isChanged]);

    return { state, error, setIsChanged };
};