import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loading from './Loading';
import { requsetsTypes } from '../../actions';
import Card from 'react-bootstrap/Card';
import CommentsContainer from './CommentsContainer.js';

export default function ArchivedTask(props) {
    const fetched = props.fetched,
          fetching = props.fetching,
          error = props.error,
          task = props.task,
          user = props.user;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requsetsTypes.getTaskFromArchive(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]));
    }, [dispatch])

    if (fetched && !fetching && !error) {
        if (user.userType === 'user' || user.userType === 'admin') {
            document.title = 'Task || TaskManager';
            return (
                <React.Fragment>
                    <h3 className='text-center'>Task info (archived)</h3>
                    <Card className='border border-darken-1 shadow p-0 bg-light mb-4'>
                        <Card.Header>
                            {user.userType === 'admin' ?
                                <div className='row m-0'>
                                    <div className='col-md-3'>
                                        <div className='row m-0'>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task creation date:</strong></small></p>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(task.taskCreationDate).toLocaleDateString('en-US')}</small></p>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className='row m-0'>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task valid until:</strong></small></p>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(task.taskValidUntilDate).toLocaleDateString('en-US')}</small></p>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className='row m-0'>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task created by:</strong></small></p>
                                            <a href={`/user/${task.taskCreatedByUserID}`} className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{task.createdByUserName}</small></a>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className='row m-0'>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task executor:</strong></small></p>
                                            <a href={`/user/${task.taskExecutorUserID}`} className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{task.executorUserName}</small></a>
                                        </div>
                                    </div>
                                </div> :
                                <div className='row m-0'>
                                    <div className='col-md-4'>
                                        <div className='row m-0'>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task creation date:</strong></small></p>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(task.taskCreationDate).toLocaleDateString('en-US')}</small></p>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='row m-0'>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task valid until:</strong></small></p>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(task.taskValidUntilDate).toLocaleDateString('en-US')}</small></p>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='row m-0'>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task created by:</strong></small></p>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{task.createdByUserName}</small></p>
                                        </div>
                                    </div>
                                </div>
                            }
        
                            {task.taskUpdatedDate ?
                                <div className='row m-0'>
                                    <div className='col'>
                                        <div className='row m-0'>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task updated:</strong></small></p>
                                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(task.taskUpdatedDate).toLocaleDateString('en-US')}</small></p>
                                        </div>
                                    </div>
                                </div> :
                                null
                            }
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {task.taskTitle}
                            </Card.Title>
                            <Card.Subtitle className='text-muted'>{task.taskStatus}</Card.Subtitle>
                            <Card.Text>
                                {task.taskDescription}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <p className='mb-0'><strong>Task complete and rate date: </strong>{new Date(task.taskCompleteAndRateDate).toLocaleDateString('en-US')}</p>
                        <p className='mb-0'><strong>Task rate: </strong>{task.taskRate}</p>
                        </Card.Footer>
                    </Card>
                    <CommentsContainer task={task} userType={user.userType} userID={user.userID} commentInputNeeded={false}/>
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