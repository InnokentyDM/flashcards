import styled from "styled-components";


export const Wrapper = styled.a`
    display: block;
    color: var(--white);
    border: 0;
    font-size: var(--fontBig);
    transition: all 0.3s;
    outline: none;
    cursor: pointer;
    text-align: center;
    
    :hover {
        opacity: 0.8;
    }
    
    :disabled {
        opacity: 0.7;
        cursor: default;
        background: var(--medGrey);
    }
`;

