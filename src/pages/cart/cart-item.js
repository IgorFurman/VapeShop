import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productImage,availability  } = props.data;
  const { cartItems, addToCart, removeFromCart, validateCartItemCount, clearItemFromCart } =
    useContext(ShopContext);

    const [isMaxQuantity, setIsMaxQuantity] = useState(false);

    const handleAddToCart = () => {
      let newQuantity = (cartItems[id] || 0) + 1;
      if(newQuantity <= availability) {
        validateCartItemCount(newQuantity, id);
        setIsMaxQuantity(false);
      } else {
        setIsMaxQuantity(true);
      }
    }
    const handleClearItem = () => {
      clearItemFromCart(id);
    }

  return (
    <div className="cart-item">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Cena: {price}zł</p>
        <div className="count-handler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            readOnly
            min='0'
          />
          <button onClick={handleAddToCart}> + </button>
          <button onClick={handleClearItem}>Usuń z koszyka</button>
          {isMaxQuantity && <p className="count-max-info">Osiągnięto maksymalną liczbę dostępnych produktów</p>}
        </div>
      </div>
    </div>
  );
};
