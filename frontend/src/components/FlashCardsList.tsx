import React from "react";

// Components
import List from "./List";
import ListItem from "./ListItem";

// Hooks
import {useParams} from "react-router-dom";
import {useFlashCardsFetch} from "../hooks/useFlashCardsFetch";

// API
import API from '../API';

type Params = {
    pileId: string;
}

const FlashCardsList: React.FC = () => {
    const { pileId } = useParams() as Params;
    const { state, error, setIsChanged } = useFlashCardsFetch(pileId);

    if (error) return <div>Something went wrong....</div>;

    const addFlashCardToPile = async (formData: object) => {
        const response = await API.piles.addFlashCardToPile(pileId, formData);
        setIsChanged(true);
    }

    const deleteFlashCardFromPile = async (flashCardId: string) => {
        const response = await API.piles.deleteFlashCardFromPile(pileId, flashCardId);
        setIsChanged(true);
    }

    return (
        <List
            header={state.pile.name}
            columnConfig={[
                {name: 'original', shouldBeInForm: true},
                {name: 'translation', shouldBeInForm: true}
            ]}
            submitCallback={addFlashCardToPile}
        >
            {state.flashcards.map(flashcard => (
                <ListItem
                    key={flashcard._id}
                    url={''}
                    items={[
                        flashcard.original,
                        flashcard.translation,
                    ]}
                    canDelete={true}
                    deleteCallback={() => {deleteFlashCardFromPile(flashcard._id)}}
                    />
            ))}
        </List>
    );
};

export default FlashCardsList;