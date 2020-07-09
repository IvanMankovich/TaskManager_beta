import React from 'react';

export default function Err() {
    document.title = 'Error 404. Page not found. || TaskManager';

    return (
        <React.Fragment>
            <h2>Error 404. Page not found. Please, check entered address.</h2>
            <a className='text-muted' href='/'>Go to start page.</a>
        </React.Fragment>
    );
}