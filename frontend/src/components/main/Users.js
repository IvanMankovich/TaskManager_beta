import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UsersList from './UsersList';
import Loading from './Loading';
import { requsetsTypes } from '../../actions'

export default function Users(props) {
    const fetched = props.fetched,
          fetching = props.fetching,
          error = props.error,
          user = props.user,
          usersList = props.tasksList;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requsetsTypes.getUsersList());
    }, [dispatch])

    if (fetched && !fetching && !error) {
        if (user.userType === 'admin') {
            document.title = 'Users list || TaskManager';
            return (
                <React.Fragment>
                    <h2 className='text-center'>
                        Users list
                    </h2>
                    <UsersList usersList={usersList} />
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
        document.title = 'Users list | Error | TaskManager';
        return (
            <React.Fragment>
                    <h2>Error.</h2>
                    <p>{error}</p>
                    <a className='text-muted' href='/'>Go to start page.</a>
            </React.Fragment>
        )
    } else {
        document.title = 'Users list | Loading | TaskManager';
        return (
            <Loading />
        )
    }
}