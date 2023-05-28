import React, { useContext } from 'react';

import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import { useNavigate } from 'react-router-dom';

import { FaMoneyCheckAlt, FaShoppingCart, FaCreditCard } from "react-icons/fa";


import './cart.css';

export const Cart = () => {
	const { cartItems, getTotalCartAmount, checkout, products } = useContext(ShopContext);
	const totalAmount = getTotalCartAmount();

	const navigate = useNavigate();
	return (
		<div className='cart'>
			<div>
				<h2>Twój koszyk</h2>
			</div>
			<div className='cartItems'>
			{products.map((product) => {
    if (cartItems && cartItems[1]) {
        return <CartItem data={product} />;
    } else {
        return null;
    }
})}
			</div>
			{totalAmount > 0 ? (
			<div className='checkout'>
		<p>Razem do zapłaty: <b>{(Math.round(totalAmount * 100) / 100).toFixed(2)}zł</b></p>


			<div className='checkout-btns-container'>
				<div className='checkout-icon-button-box'>
					
					<button onClick={() => navigate('/')}>Kontynuj zakupy</button><FaShoppingCart className='checkout-icon'/>
				</div>
				<div className='checkout-icon-button-box'>
					
					<button>Przejdź do płatności</button><FaMoneyCheckAlt className='checkout-icon'/>
				</div>
			</div>
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