import React from "react";

// Styles
import { Wrapper} from "./Button.styles";

type Props = {
    text: string;
    callback: () => void;
    clickable: boolean;
}

const Button: React.FC<Props> = ({ text, callback, clickable }) => {
    return (
        <>
        {clickable ? (
            <Wrapper type='button' onClick={callback}>
                {text}
            </Wrapper>
        ) : (
            <Wrapper type='button' disabled onClick={callback}>
                {text}
            </Wrapper>
    )}
    </>
    );
};

export default Button;