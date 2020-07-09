import React from 'react';

export default function Footer() {
    return (
        <React.Fragment>
            <footer className='navbar navbar-expand-sm bg-dark navbar-light justify-content-center container-fluid align-self-end'>
                <p className='text-light'>{new Date().getFullYear()} All rights reserved. <span className='text-muted'>That's not strictly true, is it?</span></p>
            </footer>
        </React.Fragment>
    );
}