import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { requsetsTypes } from '../../actions';
import CommentsContainer from './CommentsContainer.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export default function ShwoInfo(props) {
    const dispatch = useDispatch();

    const [taskRateValidated, setTaskRateValidated] = useState(false),
          [taskRate, setTaskRate] = useState('');

    const handleSetTaskEditable = props.handleSetTaskEditable;

    const handleChangeTaskRate = (e) => {
        let taskRate = e.currentTarget.value;
        setTaskRate(taskRate);
        setTaskRateValidated(true);
    };

    const checkTaskRateValidity = () => {
        setTaskRateValidated(true);
    };

    const changeTaskStatus = () => {
        dispatch(requsetsTypes.changeTaskStatus(props.task.taskID))
    };

    const setRate = () => {
        dispatch(requsetsTypes.rateTask({'taskID': props.task.taskID, 'taskRate': taskRate}))
    }

    if (props.task.taskArchived) {
        return (
            <React.Fragment>
                <h3 className='text-center'>Task info</h3>
                <p>Task is not avialable now. This task has been completed, rated and replaced to archive.</p>
                <Row className='m-auto w-75'>
                    <div className='col-sm-12 col-md-6 d-flex flex-column justify-content-between'>
                        <p className='text-center mb-2'>You can go back to actual tasks.</p>
                        <Button href='/tasks' className='d-block mx-auto' variant='dark'>
                            Back to actual tasks
                        </Button>
                    </div>
                    <div className='col-sm-12 col-md-6 d-flex flex-column justify-content-between'>
                        <p className='text-center mb-2'>Or check task in archive?</p>
                        <Button href={`/archive/${props.task.taskID}`} className='d-block mx-auto' variant='dark'>
                            Check task in archive
                        </Button>
                    </div>
                </Row>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <h3 className='text-center'>Task info</h3>
                <Card className='border border-darken-1 shadow p-0 bg-light mb-4'>
                    <Card.Header>
                        {props.userType === 'admin' ?
                            <div className='row m-0'>
                                <div className='col-md-3'>
                                    <div className='row m-0'>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task creation date:</strong></small></p>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(props.task.taskCreationDate).toLocaleDateString('en-US')}</small></p>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <div className='row m-0'>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task valid until:</strong></small></p>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(props.task.taskValidUntilDate).toLocaleDateString('en-US')}</small></p>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <div className='row m-0'>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task created by:</strong></small></p>
                                        <a href={`/user/${props.task.taskCreatedByUserID}`} className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{props.task.createdByUserName}</small></a>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <div className='row m-0'>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task executor:</strong></small></p>
                                        <a href={`/user/${props.task.taskExecutorUserID}`} className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{props.task.executorUserName}</small></a>
                                    </div>
                                </div>
                            </div> :
                            <div className='row m-0'>
                                <div className='col-md-4'>
                                    <div className='row m-0'>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task creation date:</strong></small></p>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(props.task.taskCreationDate).toLocaleDateString('en-US')}</small></p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='row m-0'>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task valid until:</strong></small></p>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(props.task.taskValidUntilDate).toLocaleDateString('en-US')}</small></p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='row m-0'>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task created by:</strong></small></p>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{props.task.createdByUserName}</small></p>
                                    </div>
                                </div>
                            </div>
                        }
    
                        {props.task.taskUpdatedDate ?
                            <div className='row m-0'>
                                <div className='col'>
                                    <div className='row m-0'>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'><strong>Task updated:</strong></small></p>
                                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(props.task.taskUpdatedDate).toLocaleString('en-US')}</small></p>
                                    </div>
                                </div>
                            </div> :
                            null
                        }
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            {props.task.taskTitle}
                        </Card.Title>
                        <Card.Subtitle className='text-muted'>{props.task.taskStatus}</Card.Subtitle>
                        <Card.Text>
                            {props.task.taskDescription}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {props.userType === 'admin' ?
                            <Button variant='dark' className='d-block mx-auto px-4 py-2 m-2' onClick={() => handleSetTaskEditable()}>Edit task</Button>
                            :
                            <Button variant='dark' className='d-block mx-auto px-4 py-2 m-2' onClick={() => changeTaskStatus()} disabled={props.task.taskStatus === 'Done' || 0 > (Date.parse(props.task.taskValidUntilDate) - Date.now())}>Task is done</Button>
                        }
                    </Card.Footer>
                    {props.userType === 'admin' && (props.task.taskStatus === 'Done' || (props.task.taskStatus === 'Done' && 0 > (Date.parse(props.task.taskValidUntilDate) - Date.now()))) ?
                        <Card.Footer>
                            <div className='row mx-0 justify-content-around'>
                                <Form.Control 
                                    required 
                                    className='col-sm-12 col-md-4'
                                    as='select' 
                                    defaultValue=''
                                    onChange={(e) => handleChangeTaskRate(e)} 
                                    onBlur={() => checkTaskRateValidity()}
                                    isInvalid={taskRate.value === '' && taskRateValidated} 
                                    isValid={taskRate.value !== '' && taskRateValidated}
                                    custom>
                                    <option disabled value=''>Choose rate</option>
                                    <option key='0' value='0'>0</option>
                                    <option key='1' value='1'>1</option>
                                    <option key='2' value='2'>2</option>
                                    <option key='3' value='3'>3</option>
                                    <option key='4' value='4'>4</option>
                                    <option key='5' value='5'>5</option>
                                    <option key='6' value='6'>6</option>
                                    <option key='7' value='7'>7</option>
                                    <option key='8' value='8'>8</option>
                                    <option key='9' value='9'>9</option>
                                    <option key='10' value='10'>10</option>
                                </Form.Control>
                                <Button className='col-sm-12 col-md-4' variant='dark' onClick={() => setRate()} disabled={!(taskRate.value !== '' && taskRateValidated)}>Rate and close task</Button>
                            </div>
                        </Card.Footer> :
                        null
                    }
    
                </Card>
                <CommentsContainer task={props.task} userType={props.userType} userID={props.userID} commentInputNeeded={true}/>
            </React.Fragment>
        );
    }
}