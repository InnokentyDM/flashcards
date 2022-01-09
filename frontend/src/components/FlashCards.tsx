import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';

// Components
import FlashCard from "./FlashCard/FlashCard";

// Styles
import { Wrapper, Controls } from './FlashCards.styles';

// Hooks
import { useFlashCardsFetch } from '../hooks/useFlashCardsFetch';

// Types
import {FlashCardModel} from "../models";
import ProgressBar from "./ProgressBar";
import {isPersistedState} from "../helpers";
import Button from "./Button";
type Params = {
    pileId: string;
}

const FlashCards: React.FC = () => {
    const { pileId } = useParams() as Params;
    const { state, error } = useFlashCardsFetch(pileId);
    const [index, setIndex] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [flashCard, setFlashCard] = useState<FlashCardModel>({} as FlashCardModel);
    const [progress, setProgress] = useState(0);
    const [progressTitle, setProgressTitle] = useState('');

    useEffect(() => {
        const sessionState = isPersistedState(pileId);

        if (sessionState) {
            setIndex(sessionState);
                return;
            }
    }, []);

    useEffect(() => {
        setHasNext(true);
        setHasPrev(true);

        if (index >= state.flashcards.length-1) {
            setHasNext(false);
        } else if (index === 0)
        {
            setHasPrev(false);
        }
        setProgress(((index + 1) / state.flashcards.length)*100);
        setProgressTitle(`${index + 1}/${state.flashcards.length}`);
        setFlashCard(state.flashcards[index]);
        sessionStorage.setItem(pileId, `${index}`);
    }, [state, index]);

    if (error) return <div>Something went wrong....</div>;

    const getNextFlashCard = () => {
        setIndex(index+1);
    }

    const getPrevFlashCard = () => {
        setIndex(index-1);
    }

    const restart = () => {
        setIndex(0);
        sessionStorage.setItem(pileId, `${0}`);
    }

    return (
            <Wrapper>
                <h1>{state.pile.name}</h1>
                <ProgressBar progress={progress} title={progressTitle} />
                {flashCard &&
                <FlashCard
                    key={flashCard._id}
                    original={flashCard.original}
                    translation={flashCard.translation}
                />
                }
                <Controls>
                    <Button callback={getPrevFlashCard} clickable={hasPrev} text='Previous' />
                    <Button callback={getNextFlashCard} clickable={hasNext} text='Next' />
                </Controls>
                <Button text='restart' callback={restart} clickable={true} />
            </Wrapper>
    )
}

export default FlashCards;