import React from 'react';
import CommentsList from './CommentsList';
import CommentInput from './CommentInput';

export default function CommentsContainer(props) {
    return (
        <div className='py-2 px-1 bg-light'>
            <CommentsList comments={props.task.comments} userType={props.userType} />
            {props.commentInputNeeded ?
                <CommentInput taskID={props.task.taskID} userID={props.userID}/> :
                null
            }
        </div>
    )
}