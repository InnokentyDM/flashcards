import styled from "styled-components";


export const Wrapper = styled.button`
    display: block;
    background: var(--darkGrey);
    color: var(--white);
    width: 25%;
    min-width: 200px;
    height: 40px;
    border: 0;
    font-size: var(--fontBig);
    transition: all 0.3s;
    outline: none;
    cursor: pointer;
    
    :hover {
        opacity: 0.8;
    }
    
    :disabled {
        opacity: 0.7;
        cursor: default;
        background: var(--medGrey);
    }
`;

