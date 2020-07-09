export const initialState = {
    tasksList: null,
    task: null,
    usersList: null,
}

export function dataReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASKS_LIST':
            return {
                ...state,
                tasksList: action.payload,
            }
        case 'SET_TASKS_LIST_CLEAR_TASK':
            return {
                ...state,
                tasksList: action.payload,
                task: null,
            }
        case 'SET_TASK':
            return {
                ...state,
                task: action.payload,
            }
        case 'SET_TASK_CLEAR_TASKS':
            return {
                ...state,
                task: action.payload,
                tasksList: null,
            }
        case 'SET_USERS_LIST':
            return {
                ...state,
                usersList: action.payload,
            }
        case 'SET_DATA_DEFAULT':
            return initialState;
        default:
            return state;
    }
}