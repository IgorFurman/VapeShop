import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import { Product } from '../shop/product';

import '../shop/shop&product.css';
import './search-results.css'

export const SearchResults = () => {
	const { filteredProducts } = useContext(ShopContext);
	const location = useLocation();
	const searchTerm = new URLSearchParams(location.search).get('term');

	if (filteredProducts.length === 0) {
		return (
      <div className='search-result-empty-containter'>
			<h2>
				Przykro nam, nie znaleźliśmy ofert dla "{searchTerm}"
			</h2>
      <h3>Spróbuj jeszcze raz:</h3>
      <ul>
        <li>Inaczej wpisać nazwę</li>
        <li>Sprawdzić, czy nie ma błędu</li>
        <li>Poszukać czegoś podobnego</li>
      </ul>
      </div>
		);
	}

	return (
		<>
			<h2 className='search-result-heading'>Wyniki wyszukiwania: {searchTerm}</h2>
			<div className='products'>
				{filteredProducts.map((product) => (
					<Product key={product.id} data={product} />
				))}
			</div>
		</>
	);
};
