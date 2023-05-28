import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import './add-to-cart-modal.css';

export const AddToCartModal = ({
	isModalVisible,
	handleCloseModal,
	productName,
	productImage,
	cartItems,
	addToCart,
	removeFromCart,
	updateCartItemCount,
	id
}) => {

	const itemCount = cartItems?.[id] || 0;
	
	return (
		<Modal
			isOpen={isModalVisible}
			onRequestClose={handleCloseModal}
			className={`popup-container ${isModalVisible ? 'fade-in' : 'fade-out'}`}
			overlayClassName='add-to-cart-modal-overlay'
		>
			<div className='popup-box'>
				<h3 className='popup-message'>
					{productName} został dodany do koszyka!
				</h3>
				<div className='popup-quantity-control'>
					<img src={productImage} alt={productName} className='popup-image' />
					<div className='popup-add-remove-container'>
						<button onClick={() => removeFromCart(id)}> - </button>
						<input
							value={itemCount}
							onChange={(e) =>
								updateCartItemCount(Number(e.target.value), id)
							}
							min='0'
						/>
						<button onClick={() => addToCart(id)}> + </button>
					</div>
				</div>
				<div className='popup-buttons'>
					<button onClick={handleCloseModal} className='popup-button'>
						Kontynuuj zakupy
					</button>
					<Link to='/cart' className='popup-button'>
						Przejdź do koszyka
					</Link>
				</div>
			</div>
		</Modal>
	);
};
