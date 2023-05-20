import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../../context/shop-context";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "./product-details.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartItems, products } = useContext(ShopContext);
  const product = products.find((product) => product.id === Number(id));

  const [zoomIn, setZoomIn] = useState();
  const [zoomOut, setZoomOut] = useState();
  const [resetTransform, setResetTransform] = useState();

  if (!product) {
    return <div>Produkt nie znaleziony</div>;
  }

  const {
    productName,
    price,
    productImage,
    description,
    availability,
  } = product;
  const cartItemAmount = cartItems[id];

  return (
    <section className="details">
      <div className="details-img">
        <TransformWrapper
          options={{ disabled: false }}
          onZoomIn={(e) => setZoomIn(() => e)}
          onZoomOut={(e) => setZoomOut(() => e)}
          onResetTransform={(e) => setResetTransform(() => e)}
        >
          <TransformComponent>
            <img src={productImage} alt={productName} />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="details-description">
        <h2>{productName}</h2>
        <p className="details-description-text">{description}</p>
        <p className="details-price">
          Cena: <b>{price}zł</b>
        </p>
        <p className="details-availability">
          Dostępna ilość: {availability}
        </p>
        <button className="details-addToCartBttn" onClick={() => addToCart(id)}>
          Dodaj do koszyka{" "}
          {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </button>
      </div>
    </section>
  );
};
