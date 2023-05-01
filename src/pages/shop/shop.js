import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { PRODUCTS } from '../../products';
import { Product } from './product';
import { ProductDetails } from './product-details/product-details';
import './shop.css';

export const Shop = () => {
  return (
    <section className='shop'>
      <div className='shopTitle'>
        <h1>MassiveCloud</h1>
      </div>
      <div className='products'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {PRODUCTS.map((product) => (
                  <Product key={product.id} data={product} />
                ))}
              </>
            }
          />
          <Route
            path='/products/:id'
            element={<ProductDetails products={PRODUCTS} />}
          />
        </Routes>
      </div>
    </section>
  );
};
