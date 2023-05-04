import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import { PRODUCTS } from '../products';

export const ProductSearch = () => {
  const { searchTerm, setSearchTerm, filterProducts } = useContext(ShopContext);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterProducts(value);
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
    </div>
  );
};
