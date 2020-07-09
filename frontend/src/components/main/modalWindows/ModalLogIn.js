import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import validateMail from '../../../utils/validateMail';
import { requsetsTypes } from '../../../actions';
import Spinner from 'react-bootstrap/Spinner';

export default function ModalLogIn(props) {
    const [login, setLogin] = useState(''),
          [password, setPassword] = useState(''),
          [rememberMe, setRemember] = useState(false),

          [loginValidated, setLoginValidated] = useState(),
          [loginValidity, setLoginValidity] = useState(false),

          [passwordValidated, setPasswordValidated] = useState(),
          [passwordValidity, setPasswordValidity] = useState(false);

    const fetched = useSelector(state => state.modalRequest.fetched),
          fetching = useSelector(state => state.modalRequest.fetching),
          error = useSelector(state => state.modalRequest.error),
          responseStatus = useSelector(state => state.modalRequest.responseStatus);

    const { closeModal } = props;

    const dispatch = useDispatch();

    const checkLoginValidity = (e) => {
        setLoginValidity(validateMail(e.currentTarget.value));
        setLoginValidated(true);
    }

    const checkPasswordValidity = (e) => {
        let len = e.currentTarget.value.trim().length >= 8;
        setPasswordValidity(len);
        setPasswordValidated(true);
    }

    const onSubmitLogIn = () => {
        // console.log(`login ${login.value}; password ${password.value}; remembered ${rememberMe.checked }`);
        dispatch(requsetsTypes.logIn({userMail: login.value, userPassword: password.value, isUserRemembered: rememberMe.checked ? '1' : ''}));
        // handleCloseLogIn()
    }

    switch (true) {
        // default state
        case (!fetched && !fetching && !responseStatus && !error):
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Log in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='formGroupEmail'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type='email' 
                                    placeholder='Enter email'
                                    required 
                                    onChange={(e) => checkLoginValidity(e)}  
                                    isInvalid={!loginValidity === loginValidated} 
                                    isValid={loginValidity === loginValidated}
                                    ref={(input) => {setLogin(input)}} />
                                <Form.Control.Feedback type='invalid'><p>Please, check the validity of entered e-mail.</p></Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formGroupPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type='password' 
                                    placeholder='Password' 
                                    onChange={(e) => checkPasswordValidity(e)}  
                                    isInvalid={!passwordValidity === passwordValidated} 
                                    isValid={passwordValidity === passwordValidated}
                                    ref={(input) => {setPassword(input)}} />
                                <Form.Control.Feedback type='invalid'><p>Please, check the validity of entered password. It will be at least 8 characters long.</p></Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formGroupRemember'>
                                <Form.Check 
                                    type='checkbox' 
                                    label='Remember me'
                                    ref={(input) => {setRemember(input)}} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant='outline-dark' 
                            onClick={() => closeModal()} >
                            Close
                        </Button>
                        <Button 
                            variant='dark' 
                            onClick={onSubmitLogIn} 
                            disabled={(!passwordValidated || !loginValidated) || !passwordValidity === passwordValidated || !loginValidity === loginValidated || fetching} >
                            Log in
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
        case (!fetched && fetching && !responseStatus && !error):
            // fetching
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Log in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='formGroupEmail'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    disabled={fetching}
                                    type='email' 
                                    placeholder='Enter email'
                                    required 
                                    onChange={(e) => checkLoginValidity(e)}  
                                    isInvalid={!loginValidity === loginValidated} 
                                    isValid={loginValidity === loginValidated}
                                    ref={(input) => {setLogin(input)}} />
                                <Form.Control.Feedback type='invalid'><p>Please, check the validity of entered e-mail.</p></Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formGroupPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    disabled={fetching}
                                    type='password' 
                                    placeholder='Password' 
                                    onChange={(e) => checkPasswordValidity(e)}  
                                    isInvalid={!passwordValidity === passwordValidated} 
                                    isValid={passwordValidity === passwordValidated}
                                    ref={(input) => {setPassword(input)}} />
                                <Form.Control.Feedback type='invalid'><p>Please, check the validity of entered password. It will be at least 8 characters long.</p></Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formGroupRemember'>
                                <Form.Check 
                                    disabled={fetching}
                                    type='checkbox' 
                                    label='Remember me'
                                    ref={(input) => {setRemember(input)}} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            disabled={fetching}
                            variant='outline-dark' 
                            onClick={() => closeModal()} >
                            Close
                        </Button>
                        <Button 
                            variant='dark' 
                            onClick={onSubmitLogIn} 
                            disabled={(!passwordValidated || !loginValidated) || !passwordValidity === passwordValidated || !loginValidity === loginValidated || fetching} >
                            <Spinner
                                as='span'
                                animation='grow'
                                size='sm'
                                role='status'
                                aria-hidden='true'
                            />
                            Log in...
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
        case (fetched && error):
            // fetch error
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Log in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-danger'>{error}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant='outline-dark' 
                            onClick={() => closeModal()} >
                            Close
                        </Button>
                        <Button 
                            variant='dark' 
                            onClick={onSubmitLogIn} 
                            disabled={(!passwordValidated || !loginValidated) || !passwordValidity === passwordValidated || !loginValidity === loginValidated || fetching} >
                            Log in
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
        case (fetched && !error):
            // sended data
            if (responseStatus === 202) {
                // logged
                return (
                    <React.Fragment>
                        <Modal.Header>
                            <Modal.Title>Log in</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p className='text-success'>You have been successfully logged in.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button 
                                variant='outline-dark' 
                                onClick={() => closeModal()} >
                                Close
                            </Button>
                        </Modal.Footer>
                    </React.Fragment>
                )
            } else if (responseStatus === 205) {
                // invalid data
                return (
                    <React.Fragment>
                        <Modal.Header>
                            <Modal.Title>Log in</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='text-danger'>Please, check entered data. There are no such user with entered data.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button 
                                variant='outline-dark' 
                                onClick={() => closeModal()} >
                                Close
                            </Button>
                        </Modal.Footer>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <Modal.Header>
                            <Modal.Title>Log in</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='text-danger'>Unknown response. Let us know about error.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button 
                                variant='outline-dark' 
                                onClick={() => closeModal()} >
                                Close
                            </Button>
                        </Modal.Footer>
                    </React.Fragment>
                )
            }
        // fallback
        default:
            return (
                <React.Fragment>
                        <Modal.Header>
                            <Modal.Title>Log in</Modal.Title>
                        </Modal.Header>
                    <Modal.Body>
                        <p className='text-danger'>Ooops.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant='outline-dark' 
                            onClick={() => closeModal()} >
                            Close
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
    }
}