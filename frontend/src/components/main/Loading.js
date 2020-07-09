import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
    return (
        <React.Fragment>
            <div className='d-flex w-100 h-100 align-items-center justify-content-center align-content-center'>
                <Spinner animation='border' />
            </div>
        </React.Fragment>
    );
}