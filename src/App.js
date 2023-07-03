import './App.css';
import React, { useContext, useLayoutEffect, lazy, Suspense } from 'react';
import {
	HashRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import { ShopContextProvider } from './context/shop-context.js';
import { NavbarProvider, NavbarContext } from './context/navbar-context.js';

import  ScrollToTop  from './utils/Scroll-to-top.js'

import { AgeCheck } from './components/age-check-modal/age-check';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';


import { addProductsToFirebase } from './config/firebase-products';

import Modal from 'react-modal';

const Navbar = lazy(() => import('./components/navbar/navbar').then(module => ({ default: module.Navbar })));
const Footer = lazy(() => import('./components/footer/footer').then(module => ({ default: module.Footer })));
const LoginForm = lazy(() => import('./pages/user/login/login').then(module => ({ default: module.LoginForm })));
const RegistrationForm = lazy(() => import('./pages/user/register/register').then(module => ({ default: module.RegistrationForm })));
const User = lazy(() => import('./pages/user/user-profile/user-profile').then(module => ({ default: module.User })));
const Shop = lazy(() => import('./pages/shop/shop').then(module => ({ default: module.Shop })));
const LoginModal = lazy(() => import('./components/login-modal/login-modal').then(module => ({ default: module.LoginModal })));
const Contact = lazy(() => import('./pages/contact/contact').then(module => ({ default: module.Contact })));
const Cart = lazy(() => import('./pages/cart/cart').then(module => ({ default: module.Cart })));
const SearchResults = lazy(() => import('./pages/search-results/search-results').then(module => ({ default: module.SearchResults })));
const ProductDetails = lazy(() => import('./pages/shop/product-details/product-details').then(module => ({ default: module.ProductDetails })));



addProductsToFirebase();

Modal.setAppElement('#root');

function App() {
	return (
		<NavbarProvider>
			<ShopContextProvider>
				<Router>
					<ScrollToTop>
						<AppContent />
					</ScrollToTop>
				</Router>
			</ShopContextProvider>
		</NavbarProvider>
	);
}

const AppContent = () => {
	const location = useLocation();
	const { navbarVisible, setNavbarVisible, setIsLoading } =
		useContext(NavbarContext);

		useLayoutEffect(() => {
			setNavbarVisible(location.pathname !== '/' && location.pathname !== '/products/:id');
			setIsLoading(false);
		}, [location, setNavbarVisible, setIsLoading]);

	return (
		<div className='App'>
			<Suspense fallback={<LoadingSpinner />}>

				{navbarVisible && <Navbar />}
				<AgeCheck />
				<Routes>
					<Route path='/login-modal' element={<LoginModal />} />
					<Route path='/login' element={<LoginForm />} />
					<Route path='/register' element={<RegistrationForm />} />
					<Route path='/profile/:id' element={<User />} />

					<Route path='/' element={<Shop />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='search-results' element={<SearchResults />} />
					<Route path='/products/:id' element={<ProductDetails />} />
				</Routes>
				<Footer />
			</Suspense>
		</div>
	);
};

export default App;
