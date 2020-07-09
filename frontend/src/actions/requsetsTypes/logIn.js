import { modalRequestStage, handlingUserData, requsetsTypes } from '..';

export default function logIn(sendingData) {
    let path = window.location.pathname;
    return function (dispatch) {
        dispatch(modalRequestStage.modalRequestStarted());
        return fetch('http://localhost:4000/api/logIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(sendingData),
        })
        .then(
            data => {
                dispatch(modalRequestStage.modalRequestSuccess(data));
                console.log(document.cookie);
                if (document.cookie) {
                    let obj = {};
                    let setToSessionStorage = document.cookie.split('; ').find(item => item.startsWith('isUserRemembered')).replace('isUserRemembered=', '');
                    document.cookie.split('; ').forEach(item => {
                        let [key, value] = item.split('=');
                        obj[key] = value;
                        if (!setToSessionStorage) {
                            window.sessionStorage.setItem(key, value);
                        }
                    });
                    switch (true) {
                        case /^\/$/.test(path) || /^\/about$|^\/about\/$/.test(path):
                            dispatch(requsetsTypes.getInfo())
                            break;
                        case /^\/statistic$|^\/statistic\/$/.test(path):
                            dispatch(requsetsTypes.getCommonStat())
                            break;
                        case /^\/task\/{1}/.test(path):
                            dispatch(requsetsTypes.getTask(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]))
                            break;
                        case /^\/archive\/{1}/.test(path):
                            dispatch(requsetsTypes.getTaskFromArchive(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]))
                            break;
                        case /^\/tasks$|^\/tasks\/$/.test(path):
                            dispatch(requsetsTypes.getTasksList())
                            break;
                        case /^\/user\/{1}/.test(path):
                            dispatch(requsetsTypes.getUserInfo(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]))
                            break;
                        case /^\/users$|^\/users\/$/.test(path):
                            dispatch(requsetsTypes.getUsersList())
                            break;
                        default:
                            break;
                    }
                    dispatch(handlingUserData.userLoggedIn(obj));
                }
                dispatch(modalRequestStage.modalRequestFinished());
            },
            err => {
                dispatch(modalRequestStage.modalRequestFailed(err));
                dispatch(modalRequestStage.modalRequestFinished());
            }
        )
    }
}