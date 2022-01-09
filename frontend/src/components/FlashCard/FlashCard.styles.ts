import styled from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-width: 400px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-width: 400px;
    background: var(--white);
    border: 2px solid var(--darkGrey);
    width: 25%;
    margin: 0 auto;
    
    p {
        color: var(--darkGrey);
        font-size: var(--fontBig);
        margin: 10px;
    }
    
    a {
        color: var(--darkGrey):
        font-size: var(--fontBig);
        text-decoration: none;
        margin: 10px;
    }
    
    h1 {
        color: var(--darkGrey);
    }
`;

export const CardContent = styled.div`
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
`;







