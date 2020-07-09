import React, { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import Loading from './Loading';
import { requsetsTypes } from '../../actions';

export default function Statistic(props) {
    const fetched = props.fetched,
          fetching = props.fetching,
          error = props.error,
          data = props.tasksList,
          user = props.user;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requsetsTypes.getCommonStat());
    }, [dispatch])

    if (fetched && !fetching && !error) {
        if (user.userType === 'admin') {
            document.title = 'Statistic || TaskManager';
            return (
                <React.Fragment>
                    <h2 className='text-center'>Statistic</h2>
                    <h3>Tasks statistic</h3>
                    <p>{!data.totalTasksAmount ?
                        'No tasks' :
                        `Total tasks amount: ${data.totalTasksAmount}.`}</p>
                    <p>{!data.totalCompleteTasksAmount ?
                        'No complete tasks' :
                        `Total complete tasks amount: ${data.totalCompleteTasksAmount}.`}</p>
                    <p>{!data.totalActiveTasksAmount ?
                        'No active tasks' :
                        `Total active tasks amount: ${data.totalActiveTasksAmount}.`}</p>
                    <p>{!data.totalFailedTasksAmount ?
                        'No failed tasks' :
                        `Total failed tasks amount: ${data.totalFailedTasksAmount}.`}</p>
                    <p>{!data.totalUsersAmount ?
                        'No users' :
                        `Total users amount: ${data.totalUsersAmount}.`}</p>
                </React.Fragment>
            );
        } else if (user.userType === 'user') {
            document.title = 'Statistic || TaskManager';
            return (
                <React.Fragment>
                    <h2 className='text-center'>Statistic</h2>
                    <h3>User name: {data.userName}</h3>
                    <p>{isNaN(data.userCommonRate/data.userCommonTasksAmount) ?
                        'User rate can\'t be showed without completed and rated tasks.':
                        `Common rate is ${(data.userCommonRate/data.userCommonTasksAmount).toFixed(2)} based on ${data.userCommonTasksAmount} task(s).`}</p>
                    <p>{!data.totalUsersTasksAmount ?
                        'No tasks' :
                        `Total tasks amount: ${data.totalUsersTasksAmount}.`}</p>
                    <p>{!data.totalUsersCompleteTasksAmount ?
                        'No complete tasks' :
                        `Total complete tasks amount: ${data.totalUsersCompleteTasksAmount}.`}</p>
                    <p>{!data.totalUsersActiveTasksAmount ?
                        'No active tasks' :
                        `Total active tasks amount: ${data.totalUsersActiveTasksAmount}.`}</p>
                    <p>{!data.totalUsersFailedTasksAmount ?
                        'No failed tasks' :
                        `Total failed tasks amount: ${data.totalUsersFailedTasksAmount}.`}</p>
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
        document.title = 'Statistic | Error | TaskManager';
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
        document.title = 'Statistic | Loading | TaskManager';
        return (
            <Loading />
        )
    }
}