import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requsetsTypes } from '../../actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CommentInput(props) {
    const [commentText, setCommentText] = useState(''),
          [commentTextValidated, setCommentTextValidated] = useState(),
          [commentTextValidity, setCommentTextValidity] = useState(false);
    
    const dispatch = useDispatch();

    const onBtnCLick = () => {
        setCommentText('');
        console.log({commentTaskID: props.taskID, commentUserID: props.userID, commentText: commentText});
        dispatch(requsetsTypes.addComment({commentTaskID: props.taskID, commentUserID: props.userID, commentText: commentText}));
    };

    const checkCommentTextValidity = (e) => {
        setCommentText(e.currentTarget.value)
        setCommentTextValidity(e.currentTarget.value.length >= 8);
        setCommentTextValidated(true);
    }

    return (
        <React.Fragment>
            <Form className='row my-2' >
                <Form.Group controlId='formGroupCommentText' className='col-12'>
                    <Form.Label>Enter your comment: </Form.Label>
                    <Form.Control 
                        required
                        as='textarea' 
                        rows='3' 
                        placeholder='Comment' 
                        onChange={(e) => checkCommentTextValidity(e)} 
                        isInvalid={!commentTextValidity === commentTextValidated} 
                        isValid={commentTextValidity && commentTextValidated}
                        />
                    <Form.Control.Feedback type='invalid'><p>Comment must be at least 8 characters long. Please, check and correct it.</p></Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                </Form.Group>
                <Button variant='dark' className='d-block mx-auto px-4 py-2 m-2' onClick={(e) => onBtnCLick(e)} disabled={!(commentTextValidity === commentTextValidated)}>
                    Comment
                </Button>
            </Form>
        </React.Fragment>
    )
}