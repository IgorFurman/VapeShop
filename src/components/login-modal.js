import React, { useContext } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FaTimes } from 'react-icons/fa';
import { ShopContext } from '../context/shop-context';

import './login-modal.css';


Modal.setAppElement('#root');
export const LoginModal = ({ isVisible }) => {
	const { handleCloseLoginModal } = useContext(ShopContext); //

	const handleCloseModal = () => {
		handleCloseLoginModal();
	};

	return (
		<Modal
			isOpen={isVisible}
			onRequestClose={handleCloseModal}
			className='login-modal'
			overlayClassName='login-modal-overlay'
			style={{
				overlay: {
					backgroundColor: 'rgba(0, 0, 0, 0.25)',
				},
			}}
		>
			<CSSTransition in={isVisible} timeout={300} classNames='fade'>
				<div className='login-popup-box'>
					<h3 className='login-popup-message'>
						Musisz być zalogowany, aby dodać produkt do ulubionych!
					</h3>
					<Link
						to='/login'
						className='login-popup-button'
						onClick={handleCloseModal}
					>
						Zaloguj się
					</Link>
					<FaTimes
						onClick={handleCloseModal}
						size={32}
						className='close-icon'
					/>
				</div>
			</CSSTransition>
		</Modal>
	);
};

