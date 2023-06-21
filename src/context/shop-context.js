import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';

import  {auth, db } from '../config/firebase-config';
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
      cart[i] = 1;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState({});



  useEffect(() => {
    getProductsFromFirebase().then((productList) => {
      setProducts(productList);
      setFilteredProducts(productList);
      
    });
    setIsLoading(false);
  }, []);


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

  const addToCart = async (itemId, quantity = 1) => {
    let newCount;
    
    const product = products.find(product => product.id === Number(itemId));
    const availability = product ? product.availability : 0;
  
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      newCartItems[itemId] = (newCartItems[itemId] || 0) + Number(quantity);
  
      if(newCartItems[itemId] > availability){
        newCartItems[itemId] = availability;
      }
  
      newCount = newCartItems[itemId];
      updateCartInFirestore(newCartItems);
  
      return newCartItems;
    });
  
    setCartItemCount((prevCount) => prevCount + quantity);
  
    return newCount;
  };

  const removeFromCart = async (itemId, quantity = 1) => {
    let newCount;
  
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      newCartItems[itemId] = (newCartItems[itemId] || 0) - Number(quantity);
    
      if (newCartItems[itemId] <= 0) {
        delete newCartItems[itemId];
      }
  
      newCount = newCartItems[itemId] || 0;
    
      updateCartInFirestore(newCartItems);
    
      return newCartItems;
    });
  
    setCartItemCount((prevCount) => prevCount - quantity);
  
    return newCount;
  };

  const updateCartItemCount = async (newAmount, itemId) => {
    let oldAmount = 0;
    
    const product = products.find(product => product.id === Number(itemId));
    const availability = product ? product.availability : 0;
  
    setCartItems((prevCartItems) => {
      oldAmount = prevCartItems[itemId] || 0;
      const newCartItems = { ...prevCartItems };
  
      newCartItems[itemId] = Number(newAmount);
  
      if(newCartItems[itemId] > availability){
        newCartItems[itemId] = availability;
      }
  
      updateCartInFirestore(newCartItems);
  
      return newCartItems;
    });
  
    setCartItemCount((prevCount) => {
      const itemCountDiff = Number(newAmount) - oldAmount;
      return prevCount + itemCountDiff;
    });
  
    return newAmount;
  };

  const clearItemFromCart = (id) => {
    if (cartItems.hasOwnProperty(id)) {
      const newCartItems = { ...cartItems };
      const count = newCartItems[id];
      delete newCartItems[id];
      setCartItems(newCartItems);
      setCartItemCount(prevCount => prevCount - count);
      updateCartInFirestore(newCartItems);
    }
  };

const checkout = async () => {
  const defaultCart = getDefaultCart();
  setCartItems(defaultCart);
  
 
  updateCartInFirestore(defaultCart);
};

const validateCartItemCount = (quantity, id) => {
  const product = products.find(product => product.id === Number(id));
  if(product && quantity <= product.availability) {
    updateCartItemCount(quantity, id);
  } else if(product) {
    updateCartItemCount(product.availability, id);
  }
}
const calculateDiscountPercentage = (originalPrice, currentPrice) => {
  if (originalPrice === currentPrice) {
    return 0;
  }

  const discount = originalPrice - currentPrice;
  const discountPercentage = (discount / originalPrice) * 100;

  return Math.round(discountPercentage);
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


  useEffect(() => {
    if (!loading && user) {
      getCartFromFirestore();
    }
  }, [user, loading]);
  
  const getCartFromFirestore = async () => {
    if (user) {
        const cartDocRef = doc(db, 'carts', user.uid);
        try {
            const cartSnapshot = await getDoc(cartDocRef);
            if (cartSnapshot.exists()) {
                const cartData = cartSnapshot.data();
                setCartItems(cartData);

           
                const itemCount = Object.values(cartData).reduce((acc, curr) => acc + curr, 0);
                setCartItemCount(itemCount);
            } else {
                setCartItems({});
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
    validateCartItemCount,
    clearItemFromCart,
    calculateDiscountPercentage,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {!isLoading ? props.children : <div>Ładowanie...</div>}
    </ShopContext.Provider>
  );
};


