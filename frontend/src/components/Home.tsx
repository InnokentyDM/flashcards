import React from "react";

// Components
import Grid from "./Grid";
import Pile from "./Pile";

// Hooks
import { usePileFetch } from '../hooks/usePileFetch';


const Home: React.FC = () => {
    const {state, error} = usePileFetch();
    if (error) return <div>Something went wrong....</div>;

    return (
        <Grid>
            {state.piles.map(pile => (
                <Pile
                    key={pile._id}
                    id={pile._id}
                    name={pile.name}
                    length={pile.flashcards_ids.length}
                    original_language={pile.original_language}
                    translation_language={pile.translation_language}
                    />
            ))}
        </Grid>
    );
};

export default Home;