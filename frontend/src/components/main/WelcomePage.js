import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { requsetsTypes } from '../../actions';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function WelcomePage(props) {
    const fetched = props.fetched,
          fetching = props.fetching,
          error = props.error;

    const userName = useSelector(state => state.user.userName), 
          userType = useSelector(state => state.user.userType);

    const { showModal } = props;
          
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requsetsTypes.getInfo());
    }, [dispatch])

    if (fetched && !fetching && !error) {
        document.title = 'Welcome page || TaskManager';
        if (userName && userType === 'user') {
            // common user
            return (
                <React.Fragment>
                    <h1 className='text-center'>Welcome to Task Manager!</h1>
                    <h2 className='text-center'>Make your own tasks, edit them if needed, complete them all or just remove them. Have fun.</h2>
                    <Row className='m-auto w-75'>
                        <div className='col d-flex flex-column justify-content-between'>
                            <p className='text-center mb-2'>Nice to see you again, {userName}. Do you want to check tasks?</p>
                            <Button href='/tasks' className='d-block mx-auto' variant='dark'>
                                Tasks
                            </Button>
                        </div>
                    </Row>
                </React.Fragment>
            )
        } else if (userName && userType === 'admin') {
            // admin
            return (
                <React.Fragment>
                    <h1 className='text-center'>Welcome to Task Manager!</h1>
                    <h2 className='text-center'>Make your own tasks, edit them if needed, complete them all or just remove them. Have fun.</h2>
                    <Row className='m-auto w-75'>
                        <div className='col-sm-12 col-md-6 d-flex flex-column justify-content-between'>
                            <p className='text-center mb-2'>Should you check tasks or create some new tasks?</p>
                            <Button href='/tasks' className='d-block mx-auto' variant='dark'>
                                Go to tasks...
                            </Button>
                        </div>
                        <div className='col-sm-12 col-md-6 d-flex flex-column justify-content-between'>
                            <p className='text-center mb-2'>Maybe, you want to check users?</p>
                            <Button href='/users' className='d-block mx-auto' variant='dark'>
                                Go to users...
                            </Button>
                        </div>
                    </Row>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <h1 className='text-center'>Welcome to Task Manager!</h1>
                    <h2 className='text-center'>Make your own tasks, edit them if needed, complete them all or just remove them. Have fun.</h2>
                    <Row className='m-auto w-75'>
                        <div className='col-sm-12 col-md-6 d-flex flex-column justify-content-between'>
                            <p className='text-center mb-2'>New user? Register and let's try it now.</p>
                            <Button variant='outline-dark' className='d-block mx-auto' onClick={() => showModal('signIn')}>
                                Register
                            </Button>
                        </div>
                        <div className='col-sm-12 col-md-6 d-flex flex-column justify-content-between'>
                            <p className='text-center mb-2'>Is it you? Again?</p>
                            <Button variant='dark' className='d-block mx-auto' onClick={() => showModal('logIn')}>
                                Log in
                            </Button>
                        </div>
                    </Row>
                </React.Fragment>
            )
        }
    // fetched and received an error
    } else if (fetched && !fetching && error) {
        document.title = 'Welcome page | Error | TaskManager';
        return (
            <React.Fragment>
                <main className='container bg-light flex-fill'>
                    <h2>Error.</h2>
                    <p>{error}</p>
                    <a className='text-muted' href='/'>Go to start page.</a>
                </main>
            </React.Fragment>
        )
    // no data, show loading
    } else {
        document.title = 'Welcome | Loading | TaskManager';
        return (
            <Loading />
        )
    }
}