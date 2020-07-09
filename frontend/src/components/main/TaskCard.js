import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { requsetsTypes } from '../../actions';
import cutString from './../../utils/cutString';

export default function TaskCard(props) {
    const dispatch = useDispatch();

    const deleteTask = (taskID) => {
        console.log(taskID);
        dispatch(requsetsTypes.removeTask(props.data.taskID));
    };

    const userType = useSelector(state => state.user.userType);

    const headerClassName = (status, validUntilDate) => {
        switch (true) {
            // active, not last day
            case (status === 'Undone' && Date.parse(validUntilDate) - Date.now() >= 86400000):
                return '';
                break;
            // last day active
            case (status === 'Undone' && 0 < Date.parse(validUntilDate) - Date.now() && Date.parse(validUntilDate) - Date.now() < 86400000):
                return 'bg-warning';
                break;
            // complete
            case (status === 'Done'):
                return 'bg-success';
                break;
            // failed
            case (status === 'Undone' && Date.parse(validUntilDate) - Date.now() <= 0):
                return 'bg-danger';
                break;
        }
    }
    // tasks for auth user
    if (userType === 'admin') {
        return (
            <div className='col-sm-12 col-lg-4 mb-4 px-0'>
                <Card className='d-flex shadow h-100 mx-2'>
                    <Card.Header className={headerClassName(props.data.taskStatus, props.data.taskValidUntilDate)}>
                        <small>Creation date: {new Date(props.data.taskCreationDate).toLocaleDateString('en-US')}</small>
                        <br />
                        <small>Expiration date: {new Date(props.data.taskValidUntilDate).toLocaleDateString('en-US')}</small>
                    </Card.Header>
                    <Card.Body className='d-flex flex-column mx-0 justify-content-between'>
                        <div className='mb-2'>
                            <Card.Title>
                                {props.data.taskTitle}
                            </Card.Title>
                            <Card.Text >
                                {cutString(props.data.taskDescription)}
                            </Card.Text>
                        </div>
                        <ButtonGroup size='sm'>
                            <Button href={`/task/${props.data.taskID}`} variant='outline-secondary'>
                                View
                            </Button>
                            <Button onClick={() => deleteTask(`${props.data.taskID}`)} variant='outline-secondary'>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </Card.Body>
                    <Card.Footer className='mx-0'>
                        <small className='text-muted'>Created by: <a className='link text-muted' href={`/user/${props.data.taskCreatedByUserID}`}>{props.data.createdByUserName}</a></small>
                        <br />
                        <small className='text-muted'>Executor: <a className='link text-muted' href={`/user/${props.data.taskExecutorUserID}`}>{props.data.executorUserName}</a></small>
                        {
                            props.data.taskUpdatedDate ? (
                                <React.Fragment>
                                    <br />
                                    <small className='text-muted'>Updated: {new Date(props.data.taskUpdatedDate).toLocaleString('en-US')}</small>
                                </React.Fragment>
                            ) : null
                        }

                    </Card.Footer>
                </Card>
            </div>
        )
    } else {
        return (
            <div className='col-sm-12 col-lg-4 mb-4 px-0'>
                <Card className='shadow h-100 mx-2'>
                    <Card.Header className={headerClassName(props.data.taskStatus, props.data.taskValidUntilDate)}>
                        <small>Creation date: {new Date(props.data.taskCreationDate).toLocaleDateString('en-US')}</small>
                        <br />
                        <small>Expiration date: {new Date(props.data.taskValidUntilDate).toLocaleDateString('en-US')}</small>
                    </Card.Header>
                    <Card.Body className='d-flex flex-column mx-0 justify-content-between'>
                        <div className='mb-2'>
                            <Card.Title>
                                {props.data.taskTitle}
                            </Card.Title>
                            <Card.Text>
                                {cutString(props.data.taskDescription)}
                            </Card.Text>
                        </div>
                        <Button href={`/task/${props.data.taskID}`} variant='light'>
                            Go to task...
                        </Button>
                    </Card.Body>
                    <Card.Footer className='mx-0'>
                        <small className='text-muted'>Created by: {props.data.createdByUserName}</small>
                        {
                            props.data.taskUpdatedDate ? (
                                <React.Fragment>
                                    <br />
                                <small className='text-muted'>Updated: {new Date(props.data.taskUpdatedDate).toLocaleString('en-US')}</small>
                                </React.Fragment>
                            ) : null
                        }
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}