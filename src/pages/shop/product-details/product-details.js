import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../../context/shop-context';
import { PRODUCTS } from '../../../products';

import './product-details.css';

export const ProductDetails = () => {
	const { id } = useParams();
	const { addToCart, cartItems } = useContext(ShopContext);
	const product = PRODUCTS.find((product) => product.id === Number(id));

	if (!product) {
		return <div>Produkt nie znaleziony</div>;
	}

	const { productName, price, productImage, description, availability } =
		product;
	const cartItemAmount = cartItems[id];

	return (
		<section className='details'>
			<div className='details-img'>
				<img src={productImage} alt={productName} />
			</div>
			<div className='details-description'>
				<h2>{productName}</h2>
				<p className='details-description-text'>{description}</p>
				<p className='details-price'>Cena: <b>{price}zł</b></p>
				<p className='details-availability'>Dostępna ilość: {availability}</p>
				<button className='details-addToCartBttn' onClick={() => addToCart(id)}>
					Dodaj do koszyka {cartItemAmount > 0 && <>({cartItemAmount})</>}
				</button>
			</div>
		</section>
	);
};
