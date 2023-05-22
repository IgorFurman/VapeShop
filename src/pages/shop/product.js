import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { ShopContext } from '../../context/shop-context';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import './product.css';

export const Product = (props) => {
	const { id, productName, price, productImage } = props.data;
	const {
		addToCart,
		cartItems,
		removeFromCart,
		updateCartItemCount,
		addToFavorites,
		removeFromFavorites,
	} = useContext(ShopContext);
	const cartItemAmount = cartItems[id];
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);

	const handleAddToCart = () => {
		addToCart(id);
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	const handleClick = () => {
		if (isFavorite) {
			removeFromFavorites(id);
			setIsFavorite(false);
		} else {
			addToFavorites(id);
			setIsFavorite(true);
		}
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
				<button className='add-to-cart-btn' onClick={handleAddToCart}>
					Dodaj do koszyka {cartItemAmount > 0 && <>({cartItemAmount})</>}
				</button>
				<button className='add-to-fav-btn' onClick={handleClick}>
					{isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
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
