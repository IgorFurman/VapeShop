import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { ShopContext } from '../context/shop-context';

import './login-modal.css';

Modal.setAppElement('#root');

export const LoginModal = () => {
    const { closeLoginModal, isLoginModalVisible } = useContext(ShopContext); 

    return (
        <Modal
            isOpen={isLoginModalVisible}
            onRequestClose={closeLoginModal}
            className={`login-modal ${isLoginModalVisible ? 'fade-in' : 'fade-out'}`}
            overlayClassName='login-modal-overlay'
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                },
            }}
        >
            <div className='login-popup-box'>
                <h3 className='login-popup-message'>
                    Musisz być zalogowany, aby dodać produkt do ulubionych!
                </h3>
                <Link
                    to='/login'
                    className='login-popup-button'
                    onClick={closeLoginModal}
                >
                    Zaloguj się
                </Link>
                <FaTimes
                    onClick={closeLoginModal}
                    size={32}
                    className='close-icon'
                />
            </div>
        </Modal>
    );
};
