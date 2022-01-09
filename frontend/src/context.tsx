import React, { useState, createContext } from 'react';

// Types
type ContextState = {

}

export const Context = createContext<any | null>('default_value');


const UserProvider: React.FC = ({ children }) => {
    const [state, setState] = useState(undefined);

    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    );
};

export default UserProvider;
