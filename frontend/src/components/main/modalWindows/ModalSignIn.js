import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import validateMail from '../../../utils/validateMail';
import { requsetsTypes } from '../../../actions';
import Loading from './../Loading';

export default function ModalSignIn(props) {
    const [userName, setUserName] = useState(''),
          [mail, setMail] = useState(''),
          [password, setPassword] = useState(''),
          [repeatPassword, setRepeatPassword] = useState(''),

          [userNameValidated, setUserNameValidated] = useState(),
          [userNameValidity, setUserNameValidity] = useState(false),

          [mailValidated, setMailValidated] = useState(),
          [mailValidity, setMailValidity] = useState(false),

          [passwordValidated, setPasswordValidated] = useState(),
          [passwordValidity, setPasswordValidity] = useState(false),

          [repeatPasswordValidated, setRepeatPasswordValidated] = useState(),
          [repeatPasswordValidity, setRepeatPasswordValidity] = useState(false);


    const fetched = useSelector(state => state.modalRequest.fetched),
          fetching = useSelector(state => state.modalRequest.fetching),
          error = useSelector(state => state.modalRequest.error),
          responseStatus = useSelector(state => state.modalRequest.responseStatus);

    const dispatch = useDispatch();

    const { closeModal } = props;

    const checkNameValidity = (e) => {
        let len = e.currentTarget.value.trim().length >= 2;
        setUserName(e.currentTarget.value);
        setUserNameValidity(len);
        setUserNameValidated(true);
    }

    const checkMailValidity = (e) => {
        setMailValidity(validateMail(e.currentTarget.value));
        setMailValidated(true);
    }

    const checkPasswordValidity = (e) => {
        let len = e.currentTarget.value.trim().length >= 8;
        setPassword(e.currentTarget.value)
        setPasswordValidity(len);
        setPasswordValidated(true);
    }

    const checkRepeatPasswordValidity = (e) => {
        let len = e.currentTarget.value.trim().length >= 8;
        setRepeatPassword(e.currentTarget.value)
        setRepeatPasswordValidity(len);
        setRepeatPasswordValidated(true);
    }

    const onSubmitSignIn = (e) => {
        e.preventDefault();
        console.log(`name ${userName.value}; login ${mail.value}; password ${password.value}; repeatedPass ${repeatPassword.value}`);
        dispatch(requsetsTypes.signIn({userName: userName.value, userMail: mail.value, userPassword: password.value}));
    }

    switch (true) {
        // default state
        case (!fetched && !fetching && !responseStatus && !error):
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Registration form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='formGroupName'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type='input' 
                                    placeholder='Enter your name' 
                                    required 
                                    onChange={(e) => checkNameValidity(e)}  
                                    isInvalid={!userNameValidity === userNameValidated} 
                                    isValid={userNameValidity === userNameValidated}
                                    ref={(input) => {setUserName(input)}} />
                                <Form.Control.Feedback type='invalid'><p>Please, check the validity of entered name.</p></Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'><p>Looks good! Nice to meet you, {userName.value}!</p></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formGroupEmail'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type='email' 
                                    placeholder='Enter email' 
                                    required 
                                    onChange={(e) => checkMailValidity(e)} 
                                    isInvalid={!mailValidity === mailValidated} 
                                    isValid={mailValidity === mailValidated}
                                    ref={(input) => {setMail(input)}} />
                                <Form.Control.Feedback type='invalid'><p>Please, check the validity of entered e-mail.</p></Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formGroupPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type='password' 
                                    placeholder='Password' 
                                    required 
                                    onChange={(e) => checkPasswordValidity(e)} 
                                    isInvalid={!passwordValidity === passwordValidated} 
                                    isValid={passwordValidity === passwordValidated}
                                    ref={(input) => {setPassword(input)}} />
                                <Form.Control.Feedback type='invalid'><p>Please, check the validity of entered password. It will be at least 8 characters long.</p></Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'><p>Looks good!</p></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formGroupRepeatPassword'>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control 
                                    type='password' 
                                    placeholder='Repeat password' 
                                    required 
                                    onChange={(e) => checkRepeatPasswordValidity(e)} 
                                    isInvalid={!repeatPasswordValidity === repeatPasswordValidated} 
                                    isValid={repeatPasswordValidity === repeatPasswordValidated}
                                    ref={(input) => {setRepeatPassword(input)}} />
                                <Form.Control.Feedback type='invalid'><p>Please, check the validity of entered password. It will be at least 8 characters long.</p></Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            {(passwordValidated && repeatPasswordValidated) && password.value !== repeatPassword.value ? 
                            <p className='alert alert-danger' role='alert'>Entered passwords are different. Please, check them.</p> : ''}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)}>
                            Close
                        </Button>
                        <Button 
                            variant='dark' 
                            onClick={onSubmitSignIn}
                            disabled={(!userNameValidated || !mailValidated || !passwordValidated || !repeatPasswordValidated) || 
                                        !userNameValidity === userNameValidated || 
                                        !mailValidity === mailValidated ||
                                        !passwordValidity === passwordValidated || 
                                        !repeatPasswordValidity === repeatPasswordValidated || 
                                        ((passwordValidated && repeatPasswordValidated) && password.value !== repeatPassword.value)} >
                            Register
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )

        // error during fetch
        case (fetched && error):
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Registration form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-danger'>{error}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)} disabled={fetching}>
                            Close
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )

        // loading
        case (!fetched && fetching && !responseStatus && !error):
            return (
                <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Registration form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Loading />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)} disabled={fetching}>
                            Close
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )

        // fetched
        case (fetched && !error):
            if (responseStatus === 201) {
                return (
                    <React.Fragment>
                    <Modal.Header>
                        <Modal.Title>Registration form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-success'>You have been successfully registered.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)} disabled={fetching}>
                            Close
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
                )
            } else if (responseStatus === 205) {
                return (
                    <React.Fragment>
                        <Modal.Header>
                            <Modal.Title>Registration form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='text-danger'>Sorry, but entered mail is already registered.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='outline-dark' onClick={(event) => closeModal(event)} disabled={fetching}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <Modal.Header>
                            <Modal.Title>Registration form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='text-danger'>Ooops.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='outline-dark' onClick={(event) => closeModal(event)} disabled={fetching}>
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
                        <Modal.Title>Registration form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-danger'>Ooops.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={(event) => closeModal(event)} disabled={fetching}>
                            Close
                        </Button>
                    </Modal.Footer>
                </React.Fragment>
            )
    }
}