import { useCallback, useMemo, useReducer } from "react";
import { CContext } from "./CContext";
import { CReducer } from "./CReducer";
import { LOAD_TOKEN } from "./CTypes";

export const CStates = ({ children }) => {
    const initialState = useMemo(() => ({
        token: ""
    }), []);

    const [state, dispatch] = useReducer(CReducer, initialState);

    const handleChangeToken = useCallback((token) => {
        dispatch({ type: LOAD_TOKEN, payload: token });
    }, []);

    return (
        <CContext.Provider
            value={{
                token: state.token,
                handleChangeToken
            }}
        >
            {children}
        </CContext.Provider>
    );
};
