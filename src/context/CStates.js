import { useCallback, useMemo, useReducer } from "react";
import { CContext } from "./CContext";
import { CReducer } from "./CReducer";
import { LOAD_TOKEN, LOAD_USERDATACONTEXT, LOAD_DOCTORDATACONTEXT,LOAD_APPOINTMENTCONTEXT, LOAD_VISIBLEMODAL } from "./CTypes";
import { colors } from "../common/globalStyle";
import { Modal } from "react-native";
import { ActivityIndicator,StyleSheet } from "react-native";


export const CStates = ({ children }) => {
    const initialState = useMemo(() => ({
        token: "",
        userDataContext: null,
        doctorDataContext:"",
        appointmentContext:"",
        visibleModal:false

    }), []);

    const [state, dispatch] = useReducer(CReducer, initialState);

    const handleChangeToken = useCallback((token) => {
        dispatch({ type: LOAD_TOKEN, payload: token });
    }, []);

    const handleChangeuserDataContext = useCallback((userDataContext) => {
        // console.log("userDataCstates-->", userDataContext);
        dispatch({ type: LOAD_USERDATACONTEXT, payload: userDataContext });
    }, []);

    const handleChangedoctorDataContext = useCallback((doctorDataContext) => {
        dispatch({ type: LOAD_DOCTORDATACONTEXT, payload: doctorDataContext });
    }, []);

    const handleChangeappointmentContext = useCallback((appointmentContext) => {
        dispatch({ type: LOAD_APPOINTMENTCONTEXT, payload: appointmentContext });
    }, []);

    const handleChangevisibleModal = useCallback((visibleModal) => {
        dispatch({ type: LOAD_VISIBLEMODAL, payload: visibleModal });
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
                handleChangeappointmentContext,
                visibleModal: state.visibleModal,
                handleChangevisibleModal
            }}
        >
            {children}
            <Modal
                    transparent={true}
                    visible={state.visibleModal}>
                    <ActivityIndicator
                        size="large"
                        color={colors.blue}
                        style={styles.modalActivity}
                    />
                </Modal>
        </CContext.Provider>
    );
};
const styles = StyleSheet.create({
    modalActivity: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
})