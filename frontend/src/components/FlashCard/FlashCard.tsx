import React, { useState, useEffect } from "react";

// Styles
import {
    CardContent,
    Content,
    Wrapper
} from "./FlashCard.styles";
// Components
import Button from "../Button";
// Types
type Props = {
    original: string;
    translation: string;
}

const FlashCard: React.FC<Props> = ({ original, translation}) => {
    const [translationVisible, setTranslationVisible] = useState(false);

    useEffect(() => {
        setTranslationVisible(false);
    }, [original])

    return (
        <Wrapper>
            <Content>
                <CardContent>
                    <p>{original}</p>
                    {translationVisible
                        ?
                    <p className='translation'>{translation}</p>
                        :
                        <p>********</p>
                    }
                    <Button
                        callback={() => setTranslationVisible(!translationVisible)}
                        text='translation'
                        clickable={true}
                    />
                </CardContent>
            </Content>
        </Wrapper>)
};

export default FlashCard;