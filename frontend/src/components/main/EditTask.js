import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requsetsTypes } from '../../actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import validateDate from './../../utils/valitadeDate';
import CommentsContainer from './CommentsContainer.js';

export default function EditTask(props) {
    const [taskTitle, setTaskTitle] = useState(props.task.taskTitle),
          [taskExecutor, setTaskExecutor] = useState(props.task.taskExecutorUserID),
          [taskDescription, setTaskDescription] = useState(props.task.taskDescription),
          [taskValidUntilDate, setTaskDate] = useState(new Date(props.task.taskValidUntilDate).toISOString()),
          [taskStatus, setTaskStatus] = useState(props.task.taskStatus),

          [taskTitleValidated, setTaskTitleValidated] = useState(),
          [taskTitleValidity, setTaskTitleValidity] = useState(true),

          [executorValidated, setExecutorValidated] = useState(false),

          [taskDescrValidated, setTaskDescrValidated] = useState(),
          [taskDescrValidity, setTaskDescrValidity] = useState(true),
          
          [taskDateValidated, setTaskDateValidated] = useState(),
          [taskDateValidity, setTaskDateValidity] = useState(true);

    const dispatch = useDispatch();

    const { handleSetTaskNonEditable } = props;

    const checkTaskTitleValidity = (e) => {
        setTaskTitle(e.currentTarget.value);
        let len = e.currentTarget.value.trim().length >= 8;
        setTaskTitleValidity(len);
        setTaskTitleValidated(true);
    }

    const handleChangeExecutor = (e) => {
        setTaskExecutor(e.currentTarget.value)
        let executorValue = e.currentTarget.value;
        setTaskExecutor(executorValue);
        setExecutorValidated(true);
    }

    const checkExecutorValidity = () => {
        setExecutorValidated(true);
    }

    const checkTaskDescrValidity = (e) => {
        setTaskDescription(e.currentTarget.value);
        let len = e.currentTarget.value.trim().length >= 8;
        setTaskDescrValidity(len);
        setTaskDescrValidated(true);
    }

    const checkTaskDateValidity = (e) => {
        setTaskDate(e.currentTarget.value);
        setTaskDateValidity(validateDate(e.currentTarget.value));
        setTaskDateValidated(true);
    }

    const changeTaskStatus = e => {
        e.currentTarget.checked ? setTaskStatus('Done') : setTaskStatus('Undone');
    }

    const submitChanges = () => {
        dispatch(requsetsTypes.updateTask({taskID: props.task.taskID, taskTitle: taskTitle, taskExecutorUserID: taskExecutor, taskDescription: taskDescription, taskValidUntilDate: taskValidUntilDate,  taskStatus: taskStatus}));
        handleSetTaskNonEditable();
    };

    return (
        <React.Fragment>
            <h3 className='text-center'>Edit task</h3>
            <Form className='border border-darken-1 shadow p-0 bg-light mb-4 my-2' >
            <div className='row my-2 mx-0'>
                <Form.Group controlId='formGroupTaskTitle' className='col-sm-12 col-md-6'>
                    <Form.Label>Enter task name: </Form.Label>
                    <Form.Control 
                        required 
                        type='input' 
                        placeholder='Task name' 
                        onChange={(e) => checkTaskTitleValidity(e)}  
                        isInvalid={!taskTitleValidity === taskTitleValidated} 
                        isValid={taskTitleValidity === taskTitleValidated} 
                        defaultValue={taskTitle}
                        />
                    <Form.Control.Feedback type='invalid'><p>Task name must be at least 8 characters long. Please, check and correct it.</p></Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='formGroupTaskExecutor' className='col-sm-12 col-md-6'>
                    <Form.Label>Select executor: </Form.Label>
                    <Form.Control 
                        required 
                        as='select' 
                        onChange={(e) => handleChangeExecutor(e)} 
                        onBlur={() => checkExecutorValidity()}
                        isInvalid={taskExecutor === '' && executorValidated} 
                        isValid={taskExecutor !== '' && executorValidated}
                        defaultValue={taskExecutor}
                        custom>
                        <option disabled value='' >Select executor</option>
                        {props.usersList.map(item => {
                            return <option key={item.userID} value={item.userID}>{item.userName}</option>
                        })}
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'><p>Please, select an executor.</p></Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'><p>Great!</p></Form.Control.Feedback>
                </Form.Group>
            </div>


                <Form.Group controlId='formGroupTaskDescr' className='col-12'>
                    <Form.Label>Enter task description: </Form.Label>
                    <Form.Control 
                        required
                        as='textarea' 
                        rows='3' 
                        placeholder='Task description' 
                        onChange={(e) => checkTaskDescrValidity(e)} 
                        isInvalid={!taskDescrValidity === taskDescrValidated} 
                        isValid={taskDescrValidity === taskDescrValidated}
                        defaultValue={taskDescription}
                        />
                    <Form.Control.Feedback type='invalid'><p>Task description must be at least 8 characters long. Please, check and correct it.</p></Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='formGroupTaskDate' className='col-12'>
                    <Form.Label>Enter date task should be valid until: </Form.Label>
                    <Form.Control 
                        required
                        type='date' 
                        min={`${new Date(new Date(new Date()).setDate(new Date(new Date(new Date())).getDate() + 1)).toISOString().slice(0, 10)}`} 
                        max={`${new Date().getFullYear()+1}-${new Date(props.task.taskCreationDate).toISOString().slice(5, 10)}`}
                        isInvalid={!taskDateValidity === taskDateValidated} 
                        isValid={taskDateValidity === taskDateValidated}
                        onChange={(e) => checkTaskDateValidity(e)} 
                        defaultValue={taskValidUntilDate.slice(0, 10)}
                        />
                    <Form.Control.Feedback type='invalid'><p>{`Please, select a date between ${new Date(new Date(new Date()).setDate(new Date(new Date()).getDate() + 1)).toISOString().slice(0, 10)} and ${new Date().getFullYear()+1}-${new Date(props.task.taskCreationDate).toISOString().slice(5, 10)}. Please, check and correct it.`}</p></Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='col-12'>
                    <div className='custom-control custom-switch'>
                        <input type='checkbox' className='custom-control-input' id='taskStatus' name='taskStatus' defaultChecked={props.task.taskStatus === 'Done'} onClick={(e) => changeTaskStatus(e)}></input>
                        <label className='custom-control-label' htmlFor='taskStatus'>Is task done?</label>
                    </div>
                </Form.Group>
                <Button variant='dark' className='d-block mx-auto px-4 py-2 m-2' onClick={() => submitChanges()} disabled={!((taskTitleValidity) && (taskExecutor.value !== '') && (taskDescrValidity) && (taskDateValidity))}>
                    Submit
                </Button>
            </Form>
            <CommentsContainer task={props.task} userType={props.userType} userID={props.userID} commentInputNeeded={true}/>
        </React.Fragment>
    );
}