import React, { useState, useEffect } from "react";

// Components
import List from "./List";
import ListItem from "./ListItem";

// Hooks
import { usePileFetch } from '../hooks/usePileFetch';

// API
import API from '../API';


const Piles: React.FC = () => {
    const {state, error, setIsChanged} = usePileFetch();
    if (error) return <div>Something went wrong....</div>;

    const columnConfig = [
                {name: 'name', shouldBeInForm: true},
                {name: 'flashcards', shouldBeInForm: false},
                {name: 'original_language', shouldBeInForm: true},
                {name: 'translation_language', shouldBeInForm: true},
            ];

    const addPile = async (formData: object) => {
        await API.piles.addPile(formData);
        setIsChanged(true);
    }

    const deletePile = async (pileId: string) => {
        await API.piles.deletePile(pileId);
        setIsChanged(true);
    }

    return (
        <List
            header={'Piles'}
            columnConfig={columnConfig}
            submitCallback={addPile}
        >
            {state.piles.map(pile => (
                <ListItem
                    key={pile._id}
                    url={`/piles/${pile._id}/flashcards/list`}
                    items={[
                        pile.name,
                        pile.flashcards_ids.length,
                        pile.original_language,
                        pile.translation_language
                    ]}
                    canDelete={true}
                    deleteCallback={() => {deletePile(pile._id)}}
                    />
            ))}
        </List>
    );
};

export default Piles;