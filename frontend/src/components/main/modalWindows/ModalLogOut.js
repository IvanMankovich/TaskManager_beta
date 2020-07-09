import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { requsetsTypes } from '../../../actions';
import Spinner from 'react-bootstrap/Spinner';

export default function ModalLogOut(props) {
    const fetched = useSelector(state => state.modalRequest.fetched),
          fetching = useSelector(state => state.modalRequest.fetching),
          error = useSelector(state => state.modalRequest.error),
          responseStatus = useSelector(state => state.modalRequest.responseStatus);

    const dispatch = useDispatch();

    const onSubmitLogOut = () => {
        dispatch(requsetsTypes.logOut());
        // handleCloseLogIn()
    }

    const { closeModal } = props;

    switch (true) {
        // default state
        case (!fetched && !fetching && !responseStatus && !error):
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Log out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-center'>Do you really want to log out?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)}>
                            Close
                        </Button>
                        <Button 
                            variant='dark' 
                            onClick={onSubmitLogOut} 
                            >
                            Log out
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
        case (!fetched && fetching && !responseStatus && !error):
            // fetching
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Log out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-center'>Logging out...</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)} disabled={fetching} >
                            Close
                        </Button>
                        <Button 
                            variant='dark' 
                            onClick={onSubmitLogOut} 
                            disabled={fetching}
                            >
                            <Spinner
                                as='span'
                                animation='grow'
                                size='sm'
                                role='status'
                                aria-hidden='true'
                            />
                            Logging out...
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
        case (fetched && error):
            // error
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Log out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-danger'>{error}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)}>
                            Close
                        </Button>
                        <Button 
                            variant='dark' 
                            onClick={onSubmitLogOut} 
                            >
                            Try log out again
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
        case (fetched && !error):
            // logged out
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Log out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-success'>You have been successfully logged out.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
        default:
            // fallback
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Log out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-success'>Ooops.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)}>
                            Close
                        </Button>
                        <Button 
                            variant='dark' 
                            onClick={onSubmitLogOut} 
                            >
                            Log out
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
    }
}