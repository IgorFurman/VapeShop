import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { ShopContext } from '../../context/shop-context';

import './product.css';

export const Product = (props) => {
	const { id, productName, price, productImage } = props.data;
	const { addToCart, cartItems, removeFromCart, updateCartItemCount,products } =
		useContext(ShopContext);
	const cartItemAmount = cartItems[id];
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleAddToCart = () => {
		addToCart(id);
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<div className='product'>
				<Link to={`/products/${id}`}>
					<img src={productImage} alt={productName} />
				</Link>
				<div className='product-description'>
					<p>
						<b>{productName}</b>
					</p>
					<p>{price}zł</p>
				</div>
				<button className='addToCartBttn' onClick={handleAddToCart}>
					Dodaj do koszyka {cartItemAmount > 0 && <>({cartItemAmount})</>}
				</button>
			</div>
			<Modal
				isOpen={isModalVisible}
				onRequestClose={handleCloseModal}
				className='popup-container'
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
								value={cartItems[id]}
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
		</>
	);
};
