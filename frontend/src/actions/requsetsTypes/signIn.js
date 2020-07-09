import { modalRequestStage } from '..';

export default function signIn(sendingData) {
    return function (dispatch) {
        dispatch(modalRequestStage.modalRequestStarted());
        return fetch('http://localhost:4000/api/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(sendingData),
        })
        .then(
            data => {
                dispatch(modalRequestStage.modalRequestSuccess(data))
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