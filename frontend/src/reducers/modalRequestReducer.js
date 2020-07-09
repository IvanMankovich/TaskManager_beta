export const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    responseStatus: null,
}

export function modalRequestReducer(state = initialState, action) {
    switch (action.type) {
        case 'MODAL_REQUEST_STARTED':
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null,
            }
        
        case 'MODAL_REQUEST_SUCCESS':
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: null,
                responseStatus: action.payload.status,
            }
        
        case 'MODAL_REQUEST_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload.message === 'Failed to fetch' ? 'Server is not available now. Please, try later.' : action.payload.message,
                responseStatus: null,
            }

        case 'MODAL_REQUEST_FINISHED':
            return {
                ...state,
                fetching: false,
                fetched: true,
            }
        case 'MODAL_DEFAULT':
            return initialState;
        default:
            return state;
    }
}