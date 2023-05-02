import React, { useContext } from 'react';
import { PRODUCTS } from '../../products';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import { useNavigate } from 'react-router-dom';

import './cart.css';

export const Cart = () => {
	const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
	const totalAmount = getTotalCartAmount();

	const navigate = useNavigate();
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
			{totalAmount > 0 ? (
				<div className='checkout'>
					<p>Razem do zapłaty: {totalAmount}zł</p>
					<button onClick={() => navigate('/')}>Kontynuj zakupy</button>
					<button>Przejdź do płatności</button>
				</div>
			) : (
                <>
				<h2>Twój koszyk jest pusty</h2>
                <button className='empty-cart-btn'onClick={() => navigate('/')}>Wybierz coś z naszej oferty!</button>
                </>
			)}
		</div>
	);
};