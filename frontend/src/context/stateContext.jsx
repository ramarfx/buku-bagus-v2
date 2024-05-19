import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    token: null,
    setToken: () => {},
});

export const StateContextProvider = ({ children }) => {
    const [token, _setToken] = useState(localStorage.getItem('token'));

    const setToken = (token) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    };
    return (
        <stateContext.Provider value={{ token, setToken }}>
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
