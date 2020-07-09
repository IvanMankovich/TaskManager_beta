import React from 'react';
import Card from 'react-bootstrap/Card';

export default function CommentCard(props) {
    return (
        <div className='border border-darken-1 rounded-lg mb-2'>
            <Card.Header className='py-0'>
                <div className='row m-0'>
                    <div className='col-md-6 px-0'>
                        {props.userType === 'admin' ?
                            <a href={`/user/${props.data.commentUserID}`} className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{props.data.commentCreatedByUserName}</small></a> :
                            <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{props.data.commentCreatedByUserName}</small></p>
                        }
                    </div>
                    <div className='col-md-6 px-0'>
                        <p className='text-muted col-sm-6 mb-0 p-0'><small className='my-auto'>{new Date(props.data.commentCreationDate).toLocaleString('en-US')}</small></p>
                    </div>
                </div>
            </Card.Header>
            <Card.Body className='py-0 bg-white'>
                <Card.Text>
                    {props.data.commentText}
                </Card.Text>
            </Card.Body>
        </div>
    )
}