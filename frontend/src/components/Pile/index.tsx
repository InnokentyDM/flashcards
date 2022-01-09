import React from "react";
import {Link} from "react-router-dom";

// Styles
import { Wrapper, Content } from './Pile.styles';

// Types
type Props = {
    id: string;
    name: string;
    length: number;
    original_language: string;
    translation_language: string;
}

const Pile: React.FC<Props> = ({ id, name, length, original_language, translation_language}) => (

    <Wrapper>
        <Link to={`/piles/${id}/flashcards`}>
            <Content>
                <h3>{name}</h3>
                <span>{length}</span>
                <span>{original_language}</span>
                <span>{translation_language}</span>
            </Content>

        </Link>
    </Wrapper>

);

export default Pile;