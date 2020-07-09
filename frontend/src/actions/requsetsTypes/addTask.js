import { requestStage, handleData } from '..';

export default function addTask(data) {
    return function (dispatch) {
        dispatch(requestStage.requestStarted());
        return fetch('http://localhost:4000/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data),
        }).then(
            () => fetch('http://localhost:4000/api/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            }).then(
                response =>  response.json()
            ).then(
                data => {
                    dispatch(requestStage.requestSuccess(data, null));
                    dispatch(handleData.setTasksListClearTask(data[0]));
                    dispatch(handleData.setUsersList(data[1]));
                    dispatch(requestStage.requestFinished());
                },
                err => {
                    dispatch(requestStage.requestFailed(err));
                    dispatch(requestStage.requestFinished());
                }
            ),
            err => {
                dispatch(requestStage.requestFailed(err));
                dispatch(requestStage.requestFinished());
            }
        )
    }
}