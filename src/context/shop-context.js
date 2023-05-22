import { getFirestore, collection, getDocs, doc, setDoc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";

import { app, auth } from '../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createContext, useEffect, useState } from "react";
import {LoginModal} from '../components/login-modal';

export const ShopContext = createContext(null);

const db = getFirestore(app);



export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
 ;

  const [searchTerm, setSearchTerm] = useState('');

  const [user] = useAuthState(auth);

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
        setProducts(productList);
        setFilteredProducts(productList); // 
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

  const addToFavorites = async (itemId) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userDocRef, {
            favorites: arrayUnion(itemId)
        });
        return "added";
      } catch (error) {
        console.error("Error updating favorites: ", error);
      }
    } else {
      handleLoginModal();
      return "not logged in";
    }
  };
  const removeFromFavorites = async (itemId) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(itemId)
        });
      } catch (error) {
        console.error("Error removing from favorites: ", error);
      }
    } else {
      handleLoginModal();
    }
  };
  
const handleLoginModal = () => {
  setIsLoginModalVisible(true);
};
const handleCloseLoginModal = () => {
  setIsLoginModalVisible(false);
};

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    filteredProducts,
    setFilteredProducts,
    searchTerm,
    setSearchTerm,
    products,
    addToFavorites,
    removeFromFavorites
  };
  

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
      <LoginModal isVisible={isLoginModalVisible} closeModal={handleCloseLoginModal} />
    </ShopContext.Provider>
  );
};
