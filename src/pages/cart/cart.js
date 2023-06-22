import React, { useContext } from 'react';

import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import {  Link } from 'react-router-dom';

import { FaMoneyCheckAlt, FaShoppingCart } from 'react-icons/fa';

import './cart.css';

export const Cart = () => {
	const { cartItems, getTotalCartAmount, products } = useContext(ShopContext);
	const totalAmount = getTotalCartAmount();

	return (
		<div className='cart'>
			<div>
				<h2>Twój koszyk</h2>
			</div>
			<div className='cartItems'>
				{products.map((product) => {
					if (cartItems && cartItems[product.id] && cartItems[product.id] > 0) {
						return <CartItem key={product.id} data={product} />;
					} else {
						return null;
					}
				})}
			</div>
			{totalAmount > 0 ? (
				<div className='checkout'>
					<p>
						Razem do zapłaty:{' '}
						<b>{(Math.round(totalAmount * 100) / 100).toFixed(2)}zł</b>
					</p>

					<div className='checkout-btns-container'>
					
							<Link className='checkout-icon-button-box' to='/'>
								<button >Kontynuj zakupy</button>
								<FaShoppingCart className='checkout-icon'/>
							</Link>
						
						<div className='checkout-icon-button-box'>
							<button>Przejdź do płatności</button>
							<FaMoneyCheckAlt className='checkout-icon' />
						</div>
					</div>
				</div>
			) : (
				<>
					<h2>Twój koszyk jest pusty</h2>
					<Link
					to='/'> <button
						className='empty-cart-btn'
					>
						Wybierz coś z naszej oferty!
					</button></Link>
					
				</>
			)}
		</div>
	);
};
