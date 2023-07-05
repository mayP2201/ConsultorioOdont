import { LOAD_TOKEN, LOAD_USERDATACONTEXT } from "./CTypes"


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
        default:
            return state;
    }
}