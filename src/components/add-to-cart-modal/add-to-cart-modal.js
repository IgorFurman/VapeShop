import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { ShopContext } from '../../context/shop-context';

import './add-to-cart-modal.css';

export const AddToCartModal = ({ isModalVisible, handleCloseModal, id }) => {
	const {
		products,
		cartItems,
		removeFromCart,
		validateCartItemCount,
	} = useContext(ShopContext);

	const product = products.find((product) => product.id === Number(id));
	const { productName, productImage, availability } = product || {};

	const [isMaxQuantity, setIsMaxQuantity] = useState(false);

	const handleAddToCart = () => {
		let newQuantity = (cartItems[id] || 0) + 1;
		if (newQuantity <= availability) {
			validateCartItemCount(newQuantity, id);
			setIsMaxQuantity(false);
		} else {
			setIsMaxQuantity(true);
		}
	};

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
					{isMaxQuantity && (
						<p className='popup-max-info'>
							Osiągnięto maksymalną ilość dla produktu {productName}.
						</p>
					)}
					<div className='popup-add-remove-container'>
						<button onClick={() => removeFromCart(id)}> - </button>
						<input value={cartItems[id]} readOnly min='0' />
						<button onClick={handleAddToCart}> + </button>
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
