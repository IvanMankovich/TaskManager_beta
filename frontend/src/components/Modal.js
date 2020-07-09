import React from 'react';
import './Modal.css';
import ModalLogIn from './main/modalWindows/ModalLogIn';
import ModalLogOut from './main/modalWindows/ModalLogOut';
import ModalSignIn from './main/modalWindows/ModalSignIn';

export default function Modal(props) {
    const modalType = props.modalType,
          closeModal = props.closeModal;

    if (modalType === 'logIn') {
        return (
            <div className='modal d-block'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <ModalLogIn closeModal={closeModal} />
                    </div>
                </div>
            </div>
        )
    } else if (modalType === 'logOut') {
        return (
            <div className='modal d-block'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <ModalLogOut closeModal={closeModal} />
                    </div>
                </div>
            </div>
        )
    } else if (modalType === 'signIn') {
        return (
            <div className='modal d-block'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <ModalSignIn closeModal={closeModal} />
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}