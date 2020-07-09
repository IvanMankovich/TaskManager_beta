import React from 'react';
import CommentCard from './CommentCard';

export default function CommentsList(props) {
    let comments = props.comments.map(comment => {
        return (
            <CommentCard key={comment.commentID} data={comment} userType={props.userType} />
        )
    });

    if (!comments.length) {
        return (
            <React.Fragment>
                <h4>Comments to task:</h4>
                <p>No elements.</p>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <h4>Comments to task:</h4>
                {comments}
            </React.Fragment>
        );
    }
}