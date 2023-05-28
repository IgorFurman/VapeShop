import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

import { app, auth, db } from '../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0)

  const [user, loading, error] = useAuthState(auth);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(null);

  const getCartFromLocalStorage = async () => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : getDefaultCart();
  };

  useEffect(() => {
    getProductsFromFirebase().then((productList) => {
      setProducts(productList);
      setFilteredProducts(productList);
      initializeCart();
    });
    setIsLoading(false);
  }, []);

  const initializeCart = async () => {
    const localCart = await getCartFromLocalStorage();
    setCartItems(localCart);
    setCartItemCount(getCartItemCountFromLocalStorage());
  };

  const getProductsFromFirebase = async () => {
    const productsCollectionRef = collection(db, 'products');
    try {
      const productSnapshot = await getDocs(productsCollectionRef);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return productList;
    } catch (error) {
      console.error('Error reading data from Firestore: ', error);
      return [];
    }
  };

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
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
      return newCartItems;
    });

    setCartItemCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      newCartItems[itemId] = (newCartItems[itemId] || 0) - 1;
      return newCartItems;
    });

    setCartItemCount((prevCount) => prevCount - 1);
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      newCartItems[itemId] = newAmount;
      return newCartItems;
    });

    setCartItemCount((prevCount) => {
      const itemCountDiff = newAmount - (cartItems[itemId] || 0);
      return prevCount + itemCountDiff;
    });
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const handleShowLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalVisible(false);
  };

  const isLoggedIn = () => {
    return !!user;
  };

  function safeParseJSON(json) {
    try {
      let parsed = JSON.parse(json);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch (e) {}
    return {};
  }

  useEffect(() => {
    if (!loading && user) {
      const localCart =
        safeParseJSON(localStorage.getItem('cartItems')) || {};
      if (Object.keys(localCart).length) {
        const newCartItems = { ...cartItems, ...localCart };
        setCartItems(newCartItems);
        updateCartInFirestore(newCartItems);
      } else {
        getCartFromFirestore();
      }
    } else if (!loading && !user) {
      const localCart =
        safeParseJSON(localStorage.getItem('cartItems')) || {};
      setCartItems({ ...cartItems, ...localCart });
    }
  }, [user, loading]);

  const getCartFromFirestore = async () => {
    if (user) {
      const cartDocRef = doc(db, 'carts', user.uid);
      try {
        const cartSnapshot = await getDoc(cartDocRef);
        if (cartSnapshot.exists()) {
          setCartItems(cartSnapshot.data());
        }
      } catch (error) {
        console.error('Error reading cart data from Firestore: ', error);
      }
    }
  };

  const updateCartInFirestore = async (cartData) => {
    if (user) {
      const cartDocRef = doc(db, 'carts', user.uid);
      try {
        await setDoc(cartDocRef, cartData);
        console.log('Cart data updated in Firestore');
      } catch (error) {
        console.error('Error updating cart data in Firestore: ', error);
      }
    }
  };

  useEffect(() => {
    if (cartItems && Object.keys(cartItems).length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cartItemCount', cartItemCount);
    console.log(localStorage.getItem('cartItems'))
  }, [cartItemCount]);

  const getCartItemCountFromLocalStorage = () => {
    console.log(localStorage.getItem('cartItems'))
    const savedCount = localStorage.getItem('cartItemCount');
    return savedCount ? Number(savedCount) : 0;
  };

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const unsub = onSnapshot(userRef, (doc) => {
        setFavorites(doc.data().favorites || {});
      });
      return () => unsub();
    }
  }, [auth]);

  const addToFavorites = async (productId) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites, [productId]: true };
      setDoc(userRef, { favorites: newFavorites }, { merge: true });
      return newFavorites;
    });
  };

  const removeFromFavorites = async (productId) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[productId];
      setDoc(userRef, { favorites: newFavorites }, { merge: true });
      return newFavorites;
    });
  };

  

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    cartItemCount,
    getTotalCartAmount,
    checkout,
    filteredProducts,
    setFilteredProducts,
    searchTerm,
    setSearchTerm,
    products,
    isLoggedIn,
    showLoginModal: handleShowLoginModal,
    closeLoginModal: handleCloseLoginModal,
    isLoginModalVisible,
    auth,
    addToFavorites,
    removeFromFavorites,
    favorites,
    db,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {!isLoading ? props.children : <div>Ładowanie...</div>}
    </ShopContext.Provider>
  );
};


