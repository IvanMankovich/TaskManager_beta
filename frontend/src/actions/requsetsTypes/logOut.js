import { modalRequestStage, handlingUserData, handleData } from '..';

export default function logOut() {
    return function (dispatch) {
        dispatch(modalRequestStage.modalRequestStarted());
        return fetch('http://localhost:4000/api/logOut', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(
            data => {
                dispatch(modalRequestStage.modalRequestSuccess(data));
                window.sessionStorage.clear();
                dispatch(handlingUserData.userLoggedOut());
                dispatch(handleData.setDataDefault());
                dispatch(modalRequestStage.modalRequestFinished());
            },
            err => {
                dispatch(modalRequestStage.modalRequestFailed(err));
                dispatch(modalRequestStage.modalRequestFinished());
            }
        )
        .catch(error => console.log(error.message))
    }
}