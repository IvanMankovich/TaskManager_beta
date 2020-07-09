import React from 'react';
import UserCard from './UserCard.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function UsersList(props) {
    if (!props.usersList.length) {
        // no elems
        return (
            <Container className='mx-0 px-0'>
                <p>No users.</p>
            </Container>
        )
    } else if (props.usersList.length === 1) {
        // only one elem
        let users = props.usersList.map(user => {
            return (
                <UserCard key={user.userID} data={user} />
            )
        });
        return (
            <Container className='mx-0 px-0'>
                <Row className='mx-0'>
                    {users}
                </Row>
            </Container>
        )
    } else if (props.usersList.length === 2) {
        // only two elems
        let users = props.usersList.map(user => {
            return (
                <UserCard key={user.userID} data={user} />
            )
        });
        return (
            <Container className='mx-0 px-0'>
                <Row className='mx-0'>
                    {users}
                </Row>
            </Container>
        )
    } else if (props.usersList.length >= 3) {
        // three or more elems
        let result = [];
        for (let i = 0; i < props.usersList.length; i=i+3) {
            if (props.usersList[i+2]) {
                result.push(<Row className='mx-0' key={i}>
                                <UserCard key={props.usersList[i].userID} data={props.usersList[i]} />
                                <UserCard key={props.usersList[i+1].userID} data={props.usersList[i+1]} />
                                <UserCard key={props.usersList[i+2].userID} data={props.usersList[i+2]} />
                            </Row>)
            } else if (!props.usersList[i+2] && props.usersList[i+1]) {
                result.push(<Row className='mx-0' key={i}>
                                <UserCard key={props.usersList[i].userID} data={props.usersList[i]} />
                                <UserCard key={props.usersList[i+1].userID} data={props.usersList[i+1]} />
                            </Row>)
            } else {
                result.push(<Row className='mx-0' key={i}>
                                <UserCard key={props.usersList[i].userID} data={props.usersList[i]} />
                            </Row>)
            }
        }
        return (
            <Container className='mx-0 px-0'>
                {result}
            </Container>
        )
    }
}