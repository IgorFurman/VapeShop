import React, { useContext, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../../components/navbar';
import { ProductSearch } from '../../components/search';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Product } from './product';
import { ProductDetails } from './product-details/product-details';

import { ShopContext } from '../../context/shop-context';

import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

import headerImage1 from '../../assets/header-img-1.jpg';
import headerImage2 from '../../assets/header-img-2.jpg';
import headerImage3 from '../../assets/header-img-3.jpg';
import headerImage4 from '../../assets/header-img-4.jpg';

import './shop&product.css';

export const Shop = () => {
  const [sortMode, setSortMode] = useState("none");
  const { products } = useContext(ShopContext);
  const productsRef = useRef();
  if (!products) {
    return <div>Ładowanie...</div>;
  }

  const slides = [
    {
      image: headerImage1,
      text: 'Nowa Jakość',
      description: 'Jesteśmy firmą specjalizującą się w sprzedaży e-papierosów i akcesoriów związanych z wapowaniem. Nasza pasja do zdrowego stylu życia i dążenie do zapewnienia wysokiej jakości produktów sprawiają, że jesteśmy idealnym partnerem dla wszystkich entuzjastów wapowania.',
      showHeading: true,
    },
    {
      image: headerImage2,
      text: 'Szybka dostawa',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque lacinia magna vel aliquam. Proin semper ex ante, ac tincidunt turpis tristique ut. Aliquam quis vulputate turpis.',
      showHeading: false,
    },
    {
      image: headerImage3,
      text: 'Niskie ceny',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque lacinia magna vel aliquam. Proin semper ex ante, ac tincidunt turpis tristique ut. Aliquam quis vulputate turpis.',
      showHeading: false,
    },
    {
      image: headerImage4,
      text: 'Gwarancja jakości',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque lacinia magna vel aliquam. Proin semper ex ante, ac tincidunt turpis tristique ut. Aliquam quis vulputate turpis.',
      showHeading: false,
    },
  ];

  const handleScrollToProducts = () => {
    const offset = window.pageYOffset + productsRef.current.offsetTop;
    window.scrollTo({
      left: 0,
      top: offset,
      behavior: 'smooth',
    });
  };

  // filter
 
  let sortedProducts = [...products]

  switch (sortMode) {
    case "priceHighToLow":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "priceLowToHigh":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "alphabetical":
      sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
      break;
    default:
      break;
  }

  return (
    <section className='shop'>
      <Navbar style={{ Zindex: 9999 }} />
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        showIndicators={false}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className='shop-header'
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className='overlay-text'>
              {slide.showHeading && <h1>BigCloud</h1>}
              <p>{slide.text}</p>
              <p>{slide.description}</p>
            </div>

            <div className='social-media-icons'>
              <a href='#'>
                <FaInstagram />
              </a>
              <a href='#'>
                <FaFacebook />
              </a>
              <a href='#'>
                <FaTiktok />
              </a>
            </div>

            <div className='shop-button'>
              <button onClick={handleScrollToProducts}>
                Przejdź do sklepu
              </button>
            </div>
          </div>
        ))}
      </Carousel>
      <select onChange={(e) => setSortMode(e.target.value)}>
  <option value="none">Bez sortowania</option>
  <option value="priceHighToLow">Cena: najwyższa do najniższej</option>
  <option value="priceLowToHigh">Cena: najniższa do najwyższej</option>
  <option value="alphabetical">Alfabetycznie</option>
</select>
      <div className='products' ref={productsRef}>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {sortedProducts.map((product) => (
                  <Product key={product.id} data={product} />
                ))}
              </>
            }
          />
          <Route
            path='/products/:id'
            element={<ProductDetails products={products} />}
          />
        </Routes>
      </div>
    </section>
  );
};
