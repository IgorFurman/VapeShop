import React, { useState } from 'react';

import { PRODUCTS } from '../products';

import { Navbar } from './navbar';

export const ProductSearch = ({ isSearchOpen }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const filteredProducts = PRODUCTS.filter((product) =>
		product.productName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div>
			<form>
				<input
					className='navbar-input'
					type='text'
					value={searchTerm}
					onChange={handleInputChange}
					placeholder='Wpisz nazwę wyszukiwanego produktu'
				/>
			</form>
		</div>
	);
};
