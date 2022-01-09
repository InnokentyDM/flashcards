import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
`;

export const Content = styled.div`
    max-width: var(--maxWidth);
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    
    h1 {
        color: var(--medGrey);
        margin: 10px 0;
    }
    
    
`;

export const Table = styled.table`
    width: 100%;
    
    td {
        padding: 5px 20px;
    }
    
    thead {
        background: var(--lightGrey);
        color: var(--medGrey);
        text-align: left;
        tr {
            background: var(--lightGrey);
        }
        
        th {
            padding: 5px 20px;
            text-transform: uppercase;
        }
        
        
    }
    
    tbody {
        width: 100%;
       
        tr {
            :hover {
                background: var(--lightGrey);
            }
        }
        
        .active {
            background: var(--lightGrey);
        }
    }
    
    tfoot {
        tr {
            width: 100%;
            :hover {
                background: var(--lightGrey);
            }
        }
        
        td {
            width: 100%;
            
            button {
                margin: 0 auto;
            }
        }
    }
    
`;
