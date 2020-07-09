import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ShowInfo from './ShowInfo';
import EditTask from './EditTask';
import Loading from './Loading';
import { requsetsTypes } from '../../actions'

export default function Task(props) {
    const fetched = props.fetched,
          fetching = props.fetching,
          error = props.error,
          task = props.task,
          usersList = props.usersList,
          user = props.user;

    const [taskEditable, setTaskEditable] = useState(false);

    const handleSetTaskEditable = () => {
        setTaskEditable(true);
    };

    const handleSetTaskNonEditable = () => {
        setTaskEditable(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requsetsTypes.getTask(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]));
    }, [dispatch])

    if (fetched && !fetching && !error) {
        if (user.userType === 'user') {
            document.title = 'Task || TaskManager';
            return (
                <React.Fragment>
                    <ShowInfo task={task} userType={user.userType} userID={user.userID} />
                </React.Fragment>
            );
        } else if (user.userType === 'admin') {
            document.title = 'Task || TaskManager';
            return (
                <React.Fragment>
                    {taskEditable ? 
                        <EditTask task={task} usersList={usersList} userID={user.userID} handleSetTaskNonEditable={handleSetTaskNonEditable} /> :
                        <ShowInfo task={task} usersList={usersList} userType={user.userType} userID={user.userID} handleSetTaskEditable={handleSetTaskEditable} />
                    }
                </React.Fragment>
            );
        } else {
            document.title = 'Error 404. Page not found. || TaskManager';
            return (
                <React.Fragment>
                    <h2>Error 404. Page not found. Please, check entered address.</h2>
                    <a className='text-muted' href='/'>Go to start page.</a>
                </React.Fragment>
            )
        }
    } else if (fetched && !fetching && error) {
        document.title = 'Task | Error | TaskManager';
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
        document.title = 'Task | Loading | TaskManager';
        return (
            <Loading />
        )
    }
}