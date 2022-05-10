import { auth } from "./authReducer"


const SET_INITIALIZED = "SET-IS-INITIALIZED"

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const setInitialized = () => ({ type: SET_INITIALIZED })

export const initialzeApp = () => (dispatch) => {
    Promise.all([dispatch(auth())]).then(() => {
        dispatch(setInitialized())
    })
}

export default appReducer