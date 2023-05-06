import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Product } from './product';
import { ProductDetails } from './product-details/product-details';

import { ShopContext } from '../../context/shop-context';
import './shop.css';

export const Shop = () => {
  const { filteredProducts } = useContext(ShopContext);

  return (
    <section className='shop'>
      <div className='shopTitle'>
        <h1>BigCloud</h1>
        
      </div>
      <div className='products'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {filteredProducts.map((product) => (
                  <Product key={product.id} data={product} />
                ))}
              </>
            }
          />
          <Route
            path='/products/:id'
            element={<ProductDetails products={filteredProducts} />}
          />
        </Routes>
      </div>
    </section>
  );
};
