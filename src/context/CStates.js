import { useCallback, useMemo, useReducer } from "react";
import { CContext } from "./CContext";
import { CReducer } from "./CReducer";
import { LOAD_TOKEN, LOAD_USERDATACONTEXT } from "./CTypes";

export const CStates = ({ children }) => {
    const initialState = useMemo(() => ({
        token: "",
        userDataContext:"",

    }), []);

    const [state, dispatch] = useReducer(CReducer, initialState);

    const handleChangeToken = useCallback((token) => {
        dispatch({ type: LOAD_TOKEN, payload: token });
    }, []);

    const handleChangeuserDataContext = useCallback((userDataContext) => {
        dispatch({ type: LOAD_USERDATACONTEXT, payload: userDataContext });
    }, []);

    return (
        <CContext.Provider
            value={{
                token: state.token,
                handleChangeToken,
                userDataContext: state.userDataContext,
                handleChangeuserDataContext
            }}
        >
            {children}
        </CContext.Provider>
    );
};
