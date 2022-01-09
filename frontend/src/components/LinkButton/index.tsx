import React from "react";

// Styles
import { Wrapper} from "./Button.styles";

type Props = {
    text: string;
    callback: () => void;
    clickable: boolean;
}

const LinkButton: React.FC<Props> = ({ text, callback, clickable }) => {
    return (
        <>
        {clickable ? (
            <Wrapper onClick={callback}>
                {text}
            </Wrapper>
        ) : (
            <Wrapper onClick={callback}>
                {text}
            </Wrapper>
    )}
    </>
    );
};

export default LinkButton;