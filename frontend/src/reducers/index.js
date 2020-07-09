import { combineReducers } from 'redux';
import { requestReducer } from './requestReducer';
import { userReducer } from './userReducer';
import { dataReducer } from './dataReducer';
import { modalRequestReducer } from './modalRequestReducer';

export const rootReducer = combineReducers({
    request: requestReducer,
    user: userReducer,
    data: dataReducer,
    modalRequest: modalRequestReducer,
})