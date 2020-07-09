import { requestStage, handleData } from '..';

export default function changeTaskStatus(taskID) {
    return function (dispatch) {
        dispatch(requestStage.requestStarted());
        return fetch(`http://localhost:4000/api/changeStatus/${taskID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(
            response =>  response.json()
        ).then(
            () => fetch(`http://localhost:4000/api/task/${taskID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        switch (true) {
                            case response.status === 401:
                                let error401 = new Error('Content forbidden on unauthorized client request');
                                error401.response = response;
                                throw error401;
                                break;
                            case response.status === 403:
                                let error403 = new Error('Content forbidden on client type');
                                error403.response = response;
                                throw error403;
                                break;
                            case response.status === 404:
                                let error404 = new Error('Data not found');
                                error404.response = response;
                                throw error404;
                                break;
                            case response.status >= 500:
                                let error500 = new Error('Server is not avaliable now');
                                error500.response = response;
                                throw error500;
                                break;
                        }
                    }
                }
            ).then(
                data => {
                    dispatch(requestStage.requestSuccess(data, null));
                    dispatch(handleData.setTask(data[0]));
                    dispatch(handleData.setUsersList(data[1]));
                    dispatch(requestStage.requestFinished());
                },
                err => {
                    dispatch(requestStage.requestFailed(err));
                    dispatch(requestStage.requestFinished());
                }
            )
        )
    }
}