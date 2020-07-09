import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export default function UserCard(props) {
    // tasks for auth user
    return (
        <div className='col-sm-12 col-lg-4 mb-4 px-0'>
            <Card className='shadow h-100 mx-2'>
                <Card.Header>
                    <small>User status: {props.data.userType}</small>
                </Card.Header>
                <Card.Body className='d-flex flex-column mx-0 justify-content-between'>
                    <div className='mb-2'>
                        <Card.Title>
                            User name: {props.data.userName}
                        </Card.Title>
                        <Card.Text>
                            {isNaN(props.data.userCommonRate/props.data.userCommonTasksAmount) ?
                                'No completed tasks' :
                                `Common rate is ${(props.data.userCommonRate/props.data.userCommonTasksAmount).toFixed(2)} based on ${props.data.userCommonTasksAmount} task(s).`
                            }
                        </Card.Text>
                    </div>
                    <ButtonGroup size='sm'>
                        <Button href={`/user/${props.data.userID}`} variant='outline-secondary'>
                            View profile
                        </Button>
                    </ButtonGroup>
                </Card.Body>
                <Card.Footer className='mx-0'>
                    <small>Registration date: {new Date(props.data.userCreationDate).toLocaleDateString('en-US')}</small>
                    <br />
                    <small>Last online date: {new Date(props.data.userLastOnlineDate).toLocaleString('en-US')}</small>
                </Card.Footer>
            </Card>
        </div>
    )
}