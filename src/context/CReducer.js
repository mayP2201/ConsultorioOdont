import { LOAD_TOKEN } from "./CTypes"


export const CReducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case LOAD_TOKEN: {
            return {
                ...state,
                token: payload,
            };
        }
        default:
            return state;
    }
}