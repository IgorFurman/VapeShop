import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/shop-context';
import { PRODUCTS } from '../products';

export const ProductSearch = () => {
	const { searchTerm, setSearchTerm, filterProducts } = useContext(ShopContext);
	const [suggestions, setSuggestions] = useState([]);

	const handleInputChange = (event) => {
		const value = event.target.value;
		setSearchTerm(value);
		const matchingProducts = PRODUCTS.filter((product) =>
			product.productName.toLowerCase().includes(value.toLowerCase())
		);
		setSuggestions(matchingProducts);
		filterProducts(value);
	};

	const handleSuggestionClick = (productName) => {
		setSearchTerm(productName);
		filterProducts(productName);
	};

	return (
		<div>
			<form>
				<input
					className='navbar-input'
					type='text'
					value={searchTerm}
					onChange={handleInputChange}
					placeholder='Wpisz nazwę produktu...'
				/>
			</form>
			{suggestions.length > 0 && searchTerm.length > 0 && (
				<div className='search-suggestions'>
					<ul>
						{suggestions.map((product) => (
							<li
								key={product.id}
								onMouseUp={() => handleSuggestionClick(product.productName)}
							>
								{product.productName}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
