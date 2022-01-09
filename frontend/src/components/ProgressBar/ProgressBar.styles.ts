import styled from "styled-components";

// Types
type Props = {
    progress: number;
}

export const Wrapper = styled.div`
    background: var(--lightGrey);
    border: 2px 0px 2px 0px solid var(--darkGrey);
    height: 50px;
    width: 400px;
    position: relative;
    span {
        position: absolute;
        left: 50%;
        top: 50%;
        background: var(--darkGrey);
        color: var(--white);
    }
`;

export const Content = styled.div<Props>`
    background: var(--darkGrey);
    height: 50px;
    max-width: 400px;
    width: ${( { progress}) => progress}%;
`;