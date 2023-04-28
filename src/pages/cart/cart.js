import React, { useContext } from 'react';
import { PRODUCTS } from '../../products';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import './cart.css';

export const Cart = () => {
	const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
	const totalAmount = getTotalCartAmount();
	return (
		<div className='cart'>
			<div>
				<h2>Twój koszyk</h2>
			</div>
			<div className='cartItems'>
				{PRODUCTS.map((product) => {
					if (cartItems[product.id] !== 0) {
						return <CartItem data={product} />;
					} else {
						return null;
					}
				})}
			</div>
			<div className='checkout'>
				<p>Razem do zapłaty: {totalAmount}zł</p>
				<button className=''>Przejdź do płatności</button>
			</div>
		</div>
	);
};
