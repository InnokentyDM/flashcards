import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    
    a {
        text-decoration: none;
        display: block;
        width: 100%;
    }
    
    :hover {
        background: var(--lightGrey);
    }
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 2px solid var(--darkGrey);
    padding: 20px 0;
    margin: 20px;
    
 
    
    h3 {
        font-size: var(--fontMed);
        color: var(--darkGrey);
        text-decoration: none;
    }
    
    span {
        color: var(--medGrey);
        font-size: var(--fontSmall);
        text-decoration: none;
    }
`;
