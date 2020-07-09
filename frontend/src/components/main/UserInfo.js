import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Loading from './Loading';
import { requsetsTypes } from '../../actions';

export default function UserInfo(props) {
    const fetched = props.fetched,
          fetching = props.fetching,
          error = props.error,
          userData = props.task,
          user = props.user;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requsetsTypes.getUserInfo(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]));
    }, [dispatch])

    if (fetched && !fetching && !error) {
        if (user.userType === 'user' || user.userType === 'admin') {
            document.title = 'User info || TaskManager';
            return (
                <React.Fragment>
                    <h2 className='text-center'>User info</h2>
                    <div className='col mb-2'>
                        <Card>
                            <Card.Header >
                                <small>User registered at: {new Date(userData.userCreationDate).toLocaleDateString('en-US')}</small>
                                <br />
                                <small>Last online: {new Date(userData.userLastOnlineDate).toLocaleString('en-US')}</small>
                            </Card.Header>
                            <Card.Body className='mx-0'>
                                <Card.Title>
                                    {userData.userName}
                                </Card.Title>
                                <Card.Text>
                                    User status: {userData.userType}
                                    <br />
                                    {isNaN(userData.userCommonRate/userData.userCommonTasksAmount) ?
                                        'No complete tasks' :
                                        `Common rate is ${(userData.userCommonRate/userData.userCommonTasksAmount).toFixed(2)} based on ${userData.userCommonTasksAmount} task(s).`
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </React.Fragment>
            );
        } else {
            document.title = 'Error 404. Page not found. || TaskManager';
            return (
                <React.Fragment>
                    <h2>Error 404. Page not found. Please, check entered address.</h2>
                    <main className='container bg-light flex-fill'>
                        <h2>Error.</h2>
                        <p>{error}</p>
                        <a className='text-muted' href='/'>Go to start page.</a>
                    </main>
                </React.Fragment>
            )
        }
    } else if (fetched && !fetching && error) {
        document.title = 'User info | Error | TaskManager';
        return (
            <React.Fragment>
                <main className='container bg-light flex-fill'>
                    <h2>Error.</h2>
                    <p>{error}</p>
                    <a className='text-muted' href='/'>Go to start page.</a>
                </main>
            </React.Fragment>
        )
    } else {
        document.title = 'User info | Loading | TaskManager';
        return (
            <Loading />
        )
    }
}