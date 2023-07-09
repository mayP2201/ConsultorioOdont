import { LOAD_TOKEN, LOAD_USERDATACONTEXT, LOAD_DOCTORDATACONTEXT,LOAD_APPOINTMENTCONTEXT } from "./CTypes"


export const CReducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case LOAD_TOKEN: {
            return {
                ...state,
                token: payload,
            };
        }
        case LOAD_USERDATACONTEXT: {
            return {
                ...state,
                userDataContext: payload,
            };
        }
        case LOAD_DOCTORDATACONTEXT: {
            return {
                ...state,
                doctorDataContext: payload,
            };
        }
        case LOAD_APPOINTMENTCONTEXT: {
            return {
                ...state,
                appointmentContext: payload,
            };
        }
        default:
            return state;
    }
}