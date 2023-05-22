import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

export const LoginModal = ({ isVisible, closeModal }) => {
  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={closeModal}
      className='login-popup-container'
    >
      <div className='login-popup-box'>
        <h3 className='login-popup-message'>
          Musisz być zalogowany, aby dodać produkt do ulubionych!
        </h3>
        <Link to='/login' className='login-popup-button'>
          Zaloguj się
        </Link>
      </div>
    </Modal>
  );
};


