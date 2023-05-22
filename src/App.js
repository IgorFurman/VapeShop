import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopContextProvider } from './context/shop-context.js';

import { AgeCheck } from './components/ageCheck';

import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { LoginForm } from './pages/user/login/login';
import { RegistrationForm } from './pages/user/register/register';
import { User } from './pages/user/user-profile/user-profile';
import { Shop } from './pages/shop/shop';
import { Contact } from './pages/contact/contact';
import { Cart } from './pages/cart/cart';
import { Product } from './pages/shop/product';
import { ProductDetails } from './pages/shop/product-details/product-details';
import { addProductsToFirebase } from './config/firebase-products';

addProductsToFirebase();

function App() {
	return (
		<div className='App'>
			<ShopContextProvider>
				<Router>
					<Navbar />
					<AgeCheck />
					<Routes>
						<Route path='/login' element={<LoginForm />} />
						<Route path='/register' element={<RegistrationForm />} />
						<Route path="/profile/:id" element={<User />} />

						<Route path='/' element={<Shop />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/products/:id' element={<ProductDetails />} />
					</Routes>
					<Footer />
				</Router>
			</ShopContextProvider>
		</div>
	);
}

export default App;
