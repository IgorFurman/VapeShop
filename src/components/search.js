import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/shop-context';
import { FaTimes } from 'react-icons/fa'

export const ProductSearch = ({ setIsSearchOpen }) => {
	const { searchTerm, setSearchTerm, products, setFilteredProducts } = useContext(ShopContext);

	const [suggestions, setSuggestions] = useState([]);

	
	const handleInputChange = (event) => {
		const value = event.target.value;
		setSearchTerm(value);
		const matchingProducts = products.filter((product) => {
			const words = product.productName.toLowerCase().split(' ');
			return words.some((word) => word.startsWith(value.toLowerCase()));
		});
		console.log(matchingProducts);
		setSuggestions(matchingProducts);
		setFilteredProducts(matchingProducts);
		
	};
	
	

	const handleSuggestionClick = (productName) => {
		setSearchTerm(productName);
		setSuggestions([]);
	};

	const handleCloseClick = () => {
		setSearchTerm('');
		setSuggestions([]);
		setIsSearchOpen(false); 
		setFilteredProducts(products)
	};

	return (
		<div>
			<form>
				<div style={{ position: 'relative' }}>
					<input
						className='navbar-input'
						type='text'
						value={searchTerm}
						onChange={handleInputChange}
						placeholder='Wpisz nazwę produktu...'
					/>
					{searchTerm && (
						<FaTimes
							style={{
								position: 'absolute',
								right: '-10px',
								top: '50%',
								transform: 'translateY(-50%)',
								cursor: 'pointer',
								color: 'black',
								
							}}
							onClick={handleCloseClick}
						/>
					)}
				</div>
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
