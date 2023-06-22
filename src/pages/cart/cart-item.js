import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { ShopContext } from '../../context/shop-context';

export const CartItem = (props) => {
	const { id, productName, price, productImage, availability } = props.data;
	const {
		cartItems,
		removeFromCart,
		validateCartItemCount,
		clearItemFromCart,
		
	} = useContext(ShopContext);

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
	const handleClearItem = () => {
		clearItemFromCart(id);
	};

	return (
		<div className='cart-item'>
			<Link to={`/products/${id}`}>
				<img src={productImage} alt={productName} />
			</Link>
			<div className='cart-description'>
				<p>
					<b>{productName}</b>
				</p>
				<p> Cena: {price}zł</p>
				<div className='cart-count-handler'>
					<div className='cart-count-handler-btns'>
						<button onClick={() => removeFromCart(id)}> - </button>
						<input value={cartItems[id]} readOnly min='0' />
						<button onClick={handleAddToCart}> + </button>
					</div>
					<button className='cart-delete-btn' onClick={handleClearItem}>
						Usuń z koszyka
					</button>
					{isMaxQuantity && (
						<p className='cart-count-max-info'>
							Osiągnięto maksymalną liczbę dostępnych produktów
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
