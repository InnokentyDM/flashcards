import styled from "styled-components";

export const Wrapper = styled.div`
    background: var(--darkGrey);
    padding: 0 20px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    // justify-content: space-between;
    max-width: var(--maxWidth);
    width: 100%;
    padding: 20px 0;
    margin: 0 auto;
    color: var(--white);
    
    a {
        text-decoration: none;
        color: var(--white);
    }
`;

export const Menu = styled.div`
    padding: 20px 0;
    margin-left: 100px;
    
    a {
        padding: 20px;
    }
`;