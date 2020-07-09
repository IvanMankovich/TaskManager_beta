import React from 'react';
import TaskCard from './TaskCard.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function List(props) {
    if (!props.tasksList.length) {
        // no elems
        return (
            <Container className='mx-0 px-0'>
                <p>No elements.</p>
            </Container>
        )
    } else if (props.tasksList.length === 1) {
        // only one elem
        let tasks = props.tasksList.map(task => {
            return (
                <TaskCard key={task.taskID} data={task} />
            )
        });
        return (
            <Container className='mx-0 px-0'>
                <Row className='mx-0'>
                    {tasks}
                </Row>
            </Container>
        )
    } else if (props.tasksList.length === 2) {
        // only two elems
        let tasks = props.tasksList.map(task => {
            return (
                <TaskCard key={task.taskID} data={task} />
            )
        });
        return (
            <Container className='mx-0 px-0'>
                <Row className='mx-0'>
                    {tasks}
                </Row>
            </Container>
        )
    } else if (props.tasksList.length >= 3) {
        // three or more elems
        let result = [];
        for (let i = 0; i < props.tasksList.length; i=i+3) {
            if (props.tasksList[i+2]) {
                result.push(<Row className='mx-0' key={i}>
                                <TaskCard key={props.tasksList[i].taskID} data={props.tasksList[i]} />
                                <TaskCard key={props.tasksList[i+1].taskID} data={props.tasksList[i+1]} />
                                <TaskCard key={props.tasksList[i+2].taskID} data={props.tasksList[i+2]} />
                            </Row>)
            } else if (!props.tasksList[i+2] && props.tasksList[i+1]) {
                result.push(<Row className='mx-0' key={i}>
                                <TaskCard key={props.tasksList[i].taskID} data={props.tasksList[i]} />
                                <TaskCard key={props.tasksList[i+1].taskID} data={props.tasksList[i+1]} />
                            </Row>)
            } else {
                result.push(<Row className='mx-0' key={i}>
                                <TaskCard key={props.tasksList[i].taskID} data={props.tasksList[i]} />
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