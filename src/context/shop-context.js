import {
	getFirestore,
	collection,
	getDocs,
	doc,
	setDoc,
  getDoc,
	arrayUnion,
	arrayRemove,
	updateDoc,
} from 'firebase/firestore';

import { app, auth } from '../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createContext, useEffect, useState } from 'react';


export const ShopContext = createContext();

const db = getFirestore(app);

export const ShopContextProvider = (props) => {
	const [products, setProducts] = useState([]);
 
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');

	const [user, loading, error] = useAuthState(auth);

	const getDefaultCart = (products) => {
    let cart = {};
    for (let product of products) {
        cart[product.id] = 0;
    }
    return cart;
};

const [cartItems, setCartItems] = useState(null);

const getCartFromLocalStorage = async () => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : getDefaultCart(products);
};


useEffect(() => {
  getProductsFromFirebase().then(productList => {
      setProducts(productList);
      setFilteredProducts(productList);
      getCartFromLocalStorage().then(localCart => {
          setCartItems(localCart);
      });
  });
  setIsLoading(false);
}, []);

useEffect(() => {
 
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

const getProductsFromFirebase = async () => {
  const productsCollectionRef = collection(db, 'products');
  try {
    const productSnapshot = await getDocs(productsCollectionRef);
    const productList = productSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    setProducts(productList);
    setFilteredProducts(productList);
    setCartItems(getDefaultCart(productList));
    setIsLoading(false);
  } catch (error) {
    console.error('Error reading data from Firestore: ', error);
  }
};

useEffect(() => {
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
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
      return newCartItems;
    });
  };
  
  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      newCartItems[itemId] = (newCartItems[itemId] || 0) - 1;
      return newCartItems;
    });
  };
  
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      newCartItems[itemId] = newAmount;
      return newCartItems;
    });
  };

	const checkout = () => {
		setCartItems(getDefaultCart());
		if (!user) {
			localStorage.removeItem('cartItems');
		}
	};

	const addToFavorites = async (itemId) => {
		if (user) {
			const userDocRef = doc(db, 'users', user.uid);
			try {
				await updateDoc(userDocRef, {
					favorites: arrayUnion(itemId),
				});
				return 'added';
			} catch (error) {
				console.error('Error updating favorites: ', error);
			}
		} else {
			handleShowLoginModal();
			return 'not logged in';
		}
	};
	const removeFromFavorites = async (itemId) => {
		if (user) {
			const userDocRef = doc(db, 'users', user.uid);
			try {
				await updateDoc(userDocRef, {
					favorites: arrayRemove(itemId),
				});
			} catch (error) {
				console.error('Error removing from favorites: ', error);
			}
		} else {
			handleShowLoginModal();
		}
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



	// card items saving

useEffect(() => {
    if(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}, [cartItems]);


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
      
      const localCart = safeParseJSON(localStorage.getItem('cartItems')) || {};
      if (Object.keys(localCart).length) {
        const newCartItems = { ...cartItems, ...localCart };
        setCartItems(newCartItems);  
        updateCartInFirestore(newCartItems);
        localStorage.removeItem('cartItems');
      } else {
      
        getCartFromFirestore();
      }
    } else if (!loading && !user) {
     
      const localCart = safeParseJSON(localStorage.getItem('cartItems')) || {};
      setCartItems({ ...cartItems, ...localCart }); 
    }
  }, [user, loading]);

useEffect(() => {
  const getAndSetDefaultCart = async () => {
      const productList = await getProductsFromFirebase();
      setCartItems(getDefaultCart(productList));
  };
  getAndSetDefaultCart();
}, []);




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
    const fetchData = async () => {
      await getProductsFromFirebase();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

 

  // CONTEXT VALUE 

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
    isLoggedIn,
    addToFavorites,
    removeFromFavorites,
    showLoginModal: handleShowLoginModal, 
    closeLoginModal: handleCloseLoginModal, 
    isLoginModalVisible,
    auth,
  };

	return (
		<ShopContext.Provider value={contextValue}>
			{!isLoading ? props.children : <div>Ładowanie...</div>}
		</ShopContext.Provider>
	);
};
