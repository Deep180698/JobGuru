import AppConstants from './AppConstants'

const initialState = "";
export const reducer = (state = initialState, action) => {

    switch (action.type) {

        case AppConstants.AsyncKeyLiterals.IS_AUTH :
            return action.Data

        default:
            return state;
    }
}