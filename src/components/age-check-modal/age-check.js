import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaExclamationTriangle } from 'react-icons/fa';

import './age-check.css'

Modal.setAppElement('#root')

export function AgeCheck({ children }) {
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    if (!localStorage.getItem('ageVerified')) {
      setModalOpen(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem('ageVerified', 'true');
    setModalOpen(false);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  const toggleScrollLock = (isLocked) => {
		document.body.style.overflow = isLocked ? 'hidden' : 'auto';
	};

  useEffect(() => {
		toggleScrollLock(modalOpen);
	}, [modalOpen]);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Weryfikacja wieku"
        className='age-check'
        overlayClassName='age-check-overlay'
        shouldCloseOnOverlayClick={false}
        style={{overlay: {outline: 'none'}}}
      >
        <div className='age-check-form'>
          <h2>ABY WEJŚĆ NA TĄ STRONĘ MUSISZ MIEĆ UKOŃCZONE 18 LAT</h2>
          <p className='age-check-info' >Klikając na przycisk "tak" potwierdzasz, że jesteś osobą pełnoletnią, w przeciwnym wypadku prosimy o opuszczenie strony.</p>
          <div className='age-check-container-btn-icon'>
          
          <button className='age-check-submitbtn' onClick={handleYes}>TAK</button>
          <FaExclamationTriangle className='age-check-exclamation-icon' />
          <button className='age-check-submitbtn' onClick={handleNo}>NIE</button>
          </div>
        </div>
      </Modal>
      {children}
    </>
  );
}
