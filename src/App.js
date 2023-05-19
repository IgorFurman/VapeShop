import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopContextProvider } from './context/shop-context.js';


import { AgeCheck } from './components/ageCheck';

import { Navbar } from './components/navbar';
import { Footer } from './components/footer';

import { Shop } from './pages/shop/shop';
import { Contact } from './pages/contact/contact';
import { Cart } from './pages/cart/cart';
import { Product } from './pages/shop/product';
import { ProductDetails } from './pages/shop/product-details/product-details';


function App() {
	return (
		<div className='App'>
			<ShopContextProvider>
				<Router>
					<Navbar />	
					<AgeCheck />			
					<Routes>
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
