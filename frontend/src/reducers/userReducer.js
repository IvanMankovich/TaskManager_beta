export const initialState = document.cookie && document.cookie.split('; ').find(item => item.startsWith('isUserRemembered')).replace('isUserRemembered=', '') ? {
    userName: document.cookie && document.cookie.split('; ').find(item => item.startsWith('isUserRemembered')).replace('isUserRemembered=', '') ? document.cookie.split('; ').find(item => item.startsWith('userName')).replace('userName=', '') : '',
    userID: document.cookie && document.cookie.split('; ').find(item => item.startsWith('isUserRemembered')).replace('isUserRemembered=', '') ? document.cookie.split('; ').find(item => item.startsWith('userID')).replace('userID=', '') : '',
    userAuthKey: document.cookie && document.cookie.split('; ').find(item => item.startsWith('isUserRemembered')).replace('isUserRemembered=', '') ? document.cookie.split('; ').find(item => item.startsWith('userAuthKey')).replace('userAuthKey=', '') : '',
    userType: document.cookie && document.cookie.split('; ').find(item => item.startsWith('isUserRemembered')).replace('isUserRemembered=', '') ? document.cookie.split('; ').find(item => item.startsWith('userType')).replace('userType=', '') : '',
    isUserRemembered: document.cookie && document.cookie.split('; ').find(item => item.startsWith('isUserRemembered')).replace('isUserRemembered=', '') ? document.cookie.split('; ').find(item => item.startsWith('isUserRemembered')).replace('isUserRemembered=', '') : '',
} : {
    userName: window.sessionStorage.getItem('userName'), 
    userID: window.sessionStorage.getItem('userID'),
    userAuthKey: window.sessionStorage.getItem('userAuthKey'), 
    userType: window.sessionStorage.getItem('userType'),
    isUserRemembered: window.sessionStorage.getItem('isUserRemembered'),
};
  
export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            return {
                ...state,
                userName: action.payload.userName,
                userID: action.payload.userID,
                userAuthKey: action.payload.userAuthKey,
                userType: action.payload.userType,
                isUserRemembered: action.payload.isUserRemembered,
            }
        case 'USER_LOGGED_OUT':
            return {
                ...state,
                userName: '',
                userID: '',
                userAuthKey: '',
                userType: '',
                isUserRemembered: '',
            }
        default:
            return state;
    }
};