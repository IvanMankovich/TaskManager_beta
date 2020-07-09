import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import List from './List';
import Loading from './Loading';
import InputContainer from './InputContainer';
import { requsetsTypes } from '../../actions';

export default function Tasks(props) {
    const fetched = props.fetched,
          fetching = props.fetching,
          error = props.error,
          user = props.user,
          usersList = props.usersList,
          tasksList = props.tasksList;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requsetsTypes.getTasksList());
    }, [dispatch])

    if (fetched && !fetching && !error) {
        if (user.userType === 'user') {
            document.title = 'Tasks list || TaskManager';
            return (
                <React.Fragment>
                    <h2 className='text-center'>
                        Tasks list
                    </h2>
                    <List tasksList={tasksList} />
                </React.Fragment>
            );
        } else if (user.userType === 'admin') {
            document.title = 'Tasks list || TaskManager';
            return (
                <React.Fragment>
                    <h2 className='text-center'>
                        Tasks list
                    </h2>
                    <InputContainer usersList={usersList} />
                    <List tasksList={tasksList} />
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
        document.title = 'Tasks list | Error | TaskManager';
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
        document.title = 'Tasks list | Loading | TaskManager';
        return (
            <Loading />
        )
    }
}