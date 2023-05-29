import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../../context/shop-context";


import  ModalImage  from "react-modal-image"; 


import "./product-details.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartItems, products } = useContext(ShopContext);
  const product = products.find((product) => product.id === Number(id));



  if (!product) {
    return <div>Produkt nie znaleziony</div>;
  }

  const {
    productName,
    price,
    productImage,
    description,
    availability,
    discount,
    oldPrice,
  } = product;
  const cartItemAmount = cartItems[id];

  return (
    <section className="details">
      <div className="details-img" >
      <ModalImage
          small={productImage}
          large={productImage}
          alt={productName}
        />
      </div>
      <div className="details-description">
        <h2>{productName}</h2>
        <p className="details-description-text">{description}</p>
        {discount ? (
						<>
							<p className='product-discount-old-price-details'>Stara cena: {oldPrice} zł</p>
							<p className='product-discount-actual-price-details'>Nowa cena: {price} zł </p>
						</>
					) : (
						<p className='product-discount-actual-price-details'>Cena: {price} zł</p>
					)}
        <p className="details-availability">
          Dostępna ilość: {availability}
        </p>
        <button className="details-add-to-bart-btn" onClick={() => addToCart(id)}>
          Dodaj do koszyka{" "}
          {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </button>
      </div>
    </section>
  );
};
