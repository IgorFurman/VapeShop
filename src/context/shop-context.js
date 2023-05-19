import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from '../config/firebase-config';
import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const db = getFirestore(app);



export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  useEffect(() => {
    const getProductsFromFirebase = async () => {
      const productsCollectionRef = collection(db, "products");
      try {
        const productSnapshot = await getDocs(productsCollectionRef);
        const productList = productSnapshot.docs.map(doc => doc.data());
  
        console.log(productList); 
  
        setProducts(productList);
        let defaultCart = {};
        for (let product of productList) {
            defaultCart[product.id] = 0;
        }
        setCartItems(defaultCart);
      } catch (error) {
        console.error("Error reading data from Firestore: ", error);
      }
    };

    getProductsFromFirebase();
  }, []);


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const filterProducts = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    filteredProducts,
    filterProducts,
    searchTerm,
    setSearchTerm,
    products,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
