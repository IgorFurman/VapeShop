import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];

  return (
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
      <button className='addToCartBttn' onClick={() => addToCart(id)}>
        Dodaj do koszyka {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
      <Link className='product-details' to={`/products/${id}`}>Zobacz więcej</Link>
    </div>
  );
};
