import { useCallback, useMemo, useReducer } from "react";
import { CContext } from "./CContext";
import { CReducer } from "./CReducer";
import { LOAD_TOKEN, LOAD_USERDATACONTEXT, LOAD_DOCTORDATACONTEXT,LOAD_APPOINTMENTCONTEXT } from "./CTypes";

export const CStates = ({ children }) => {
    const initialState = useMemo(() => ({
        token: "",
        userDataContext:"",
        doctorDataContext:"",
        appointmentContext:""

    }), []);

    const [state, dispatch] = useReducer(CReducer, initialState);

    const handleChangeToken = useCallback((token) => {
        dispatch({ type: LOAD_TOKEN, payload: token });
    }, []);

    const handleChangeuserDataContext = useCallback((userDataContext) => {
        dispatch({ type: LOAD_USERDATACONTEXT, payload: userDataContext });
    }, []);

    const handleChangedoctorDataContext = useCallback((doctorDataContext) => {
        dispatch({ type: LOAD_DOCTORDATACONTEXT, payload: doctorDataContext });
    }, []);

    const handleChangeappointmentContext = useCallback((appointmentContext) => {
        dispatch({ type: LOAD_APPOINTMENTCONTEXT, payload: appointmentContext });
    }, []);

    return (
        <CContext.Provider
            value={{
                token: state.token,
                handleChangeToken,
                userDataContext: state.userDataContext,
                handleChangeuserDataContext,
                doctorDataContext: state.doctorDataContext,
                handleChangedoctorDataContext,
                appointmentContext: state.appointmentContext,
                handleChangeappointmentContext
            }}
        >
            {children}
        </CContext.Provider>
    );
};
