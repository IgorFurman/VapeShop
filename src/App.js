import './App.css';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
	HashRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import { ShopContextProvider } from './context/shop-context.js';

import { AgeCheck } from './components/age-check';

import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { LoginForm } from './pages/user/login/login';
import { RegistrationForm } from './pages/user/register/register';
import { User } from './pages/user/user-profile/user-profile';
import { Shop } from './pages/shop/shop';
import { LoginModal } from './components/login-modal';
import { Contact } from './pages/contact/contact';
import { Cart } from './pages/cart/cart';
import { Product } from './pages/shop/product';
import { SearchResults } from './pages/search-results/search-results';
import { ProductDetails } from './pages/shop/product-details/product-details';
import { addProductsToFirebase } from './config/firebase-products';

import Modal from 'react-modal';

addProductsToFirebase();

Modal.setAppElement('#root');

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [navbarVisible, setNavbarVisible] = useState(true);

  return (
    <NavbarContext.Provider value={{ navbarVisible, setNavbarVisible }}>
      {children}
    </NavbarContext.Provider>
  );
};

function App() {
  return (
    <NavbarProvider>
      <ShopContextProvider>
        <Router>
          <AppContent />
        </Router>
      </ShopContextProvider>
    </NavbarProvider>
  );
}

const AppContent = () => {
  const location = useLocation();
  const { navbarVisible, setNavbarVisible } = useContext(NavbarContext);

  useEffect(() => {
    setNavbarVisible(location.pathname !== '/');
  }, [location, setNavbarVisible]);

  return (
    <div className='App'>
      {navbarVisible && <Navbar />}
      <AgeCheck />
      <Routes>
        <Route path='/login-modal' element={<LoginModal />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path="/profile/:id" element={<User />} />

        <Route path='/' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="search-results" element={<SearchResults />} />
        <Route path='/products/:id' element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App
