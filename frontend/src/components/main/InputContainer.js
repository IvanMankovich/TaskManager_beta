import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requsetsTypes } from '../../actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import validateDate from './../../utils/valitadeDate';

export default function InputContainer(props) {
    const [taskName, setTaskName] = useState(''),
          [taskExecutor, setTaskExecutor] = useState(''),
          [taskDescr, setTaskDescr] = useState(''),
          [taskDate, setTaskDate] = useState(''),

          [taskNameValidated, setTaskNameValidated] = useState(),
          [taskNameValidity, setTaskNameValidity] = useState(false),

          [executorValidated, setExecutorValidated] = useState(false),

          [taskDescrValidated, setTaskDescrValidated] = useState(),
          [taskDescrValidity, setTaskDescrValidity] = useState(false),
          
          [taskDateValidated, setTaskDateValidated] = useState(),
          [taskDateValidity, setTaskDateValidity] = useState(false);
    
    const dispatch = useDispatch();

    const onBtnCLick = () => {
        // console.log({taskTitle: taskName, taskDescription: taskDescr, taskExecutorUserID: taskExecutor, taskValidUntilDate: taskDate});
        dispatch(requsetsTypes.addTask({taskTitle: taskName, taskDescription: taskDescr, taskExecutorUserID: taskExecutor, taskValidUntilDate: taskDate}));
    };

    const checkTaskNameValidity = (e) => {
        setTaskName(e.currentTarget.value);
        let len = e.currentTarget.value.trim().length >= 8;
        setTaskNameValidity(len);
        setTaskNameValidated(true);
    }

    const handleChangeExecutor = (e) => {
        e.preventDefault();
        setTaskExecutor(e.currentTarget.value);
        setExecutorValidated(true);
    }

    const checkExecutorValidity = () => {
        setExecutorValidated(true);
    }

    const checkTaskDescrValidity = (e) => {
        setTaskDescr(e.currentTarget.value);
        let len = e.currentTarget.value.trim().length >= 8;
        setTaskDescrValidity(len);
        setTaskDescrValidated(true);
    }

    const checkTaskDateValidity = (e) => {
        setTaskDate(e.currentTarget.value)
        setTaskDateValidity(validateDate(e.currentTarget.value));
        setTaskDateValidated(true);
    }

    return (
        <React.Fragment>
            <Form className='border border-darken-1 shadow my-2 py-2'>
                <div className='row my-2 mx-0'>
                    <Form.Group controlId='formGroupTaskName' className='col-sm-12 col-md-6'>
                        <Form.Label>Enter task name: </Form.Label>
                        <Form.Control 
                            required 
                            type='input' 
                            placeholder='Task name' 
                            onChange={(e) => checkTaskNameValidity(e)}  
                            isInvalid={!taskNameValidity === taskNameValidated} 
                            isValid={taskNameValidity === taskNameValidated}
                            />
                        <Form.Control.Feedback type='invalid'><p>Task name must be at least 8 characters long. Please, check and correct it.</p></Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='formGroupTaskExecutor' className='col-sm-12 col-md-6'>
                        <Form.Label>Select executor: </Form.Label>
                        <Form.Control 
                            required 
                            as='select' 
                            value={taskExecutor}
                            onChange={(e) => handleChangeExecutor(e)} 
                            onBlur={() => checkExecutorValidity()}
                            isInvalid={taskExecutor === '' && executorValidated} 
                            isValid={taskExecutor !== '' && executorValidated}
                            custom>
                            <option disabled value='' >Select executor</option>
                            {props.usersList.map(item => {
                                return <option key={item.userID} value={item.userID}>{item.userName}</option>
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'><p>Please, select an executor.</p></Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'><p>Great!</p></Form.Control.Feedback>
                    </Form.Group>
                    {/* create field with stat of selected user */}
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
                        />
                    <Form.Control.Feedback type='invalid'><p>Task description must be at least 8 characters long. Please, check and correct it.</p></Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='formGroupTaskDate' className='col-12'>
                    <Form.Label>Enter date task should be valid until: </Form.Label>
                    <Form.Control 
                        required
                        type='date' 
                        min={`${new Date(new Date(new Date()).setDate(new Date(new Date()).getDate() + 1)).toISOString().slice(0, 10)}`} 
                        max={`${new Date().getFullYear()+1}-${new Date().toISOString().slice(5, 10)}`}
                        isInvalid={!taskDateValidity === taskDateValidated} 
                        isValid={taskDateValidity === taskDateValidated}
                        onChange={(e) => checkTaskDateValidity(e)} 
                        />
                    <Form.Control.Feedback type='invalid'><p>{`Please, select a date between ${new Date(new Date(new Date()).setDate(new Date(new Date()).getDate() + 1)).toISOString().slice(0, 10)} and ${new Date().getFullYear()+1}-${new Date().toISOString().slice(5, 10)}. Please, check and correct it.`}</p></Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                </Form.Group>
                <Button variant='dark' className='d-block mx-auto px-4 py-2 m-2' onClick={() => onBtnCLick()} disabled={!((taskNameValidity === taskNameValidated) && (taskExecutor.value !== '' && executorValidated) && (taskDescrValidity === taskDescrValidated) && (taskDateValidity === taskDateValidated))}>
                    Submit
                </Button>
            </Form>
        </React.Fragment>
    )
}