export const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    payload: null,
    statusCode: null,
}

export function requestReducer(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_STARTED':
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null,
                payload: null,
                statusCode: null,
            }
        
        case 'REQUEST_SUCCESS':
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: null,
                payload: action.payload,
                statusCode: action.statusCode,
            }
        
        case 'REQUEST_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload.message === 'Failed to fetch' ? 'Server is not available now. Please, try later.' : action.payload.message,
                payload: null,
                statusCode: action.statusCode,
            }

        case 'REQUEST_FINISHED':
            return {
                ...state,
                fetching: false,
                fetched: true,
            }
        default:
            return state;
    }
}