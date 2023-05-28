import React, { useContext, useRef, useState } from 'react';
import Select from 'react-select';
import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../../components/navbar';
import { ProductSearch } from '../../components/search';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Product } from './product';
import { ProductDetails } from './product-details/product-details';

import { ShopContext } from '../../context/shop-context';

import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import TikTokShadowIcon from '../../assets/icon/tiktok-color-icon.png';
import { useSpring, animated } from 'react-spring';

import headerImage1 from '../../assets/header-img-1.jpg';
import headerImage2 from '../../assets/header-img-2.jpg';
import headerImage3 from '../../assets/header-img-3.jpg';
import headerImage4 from '../../assets/header-img-4.jpg';

import './shop&product.css';

export const Shop = () => {
  const [sortMode, setSortMode] = useState('none');
  const { products } = useContext(ShopContext);
  const SelectRef = useRef();
  const [isHoveredInstagram, setIsHoveredInstagram] = useState(false);
  const [isHoveredFacebook, setIsHoveredFacebook] = useState(false);
  const [isHoveredTiktok, setIsHoveredTiktok] = useState(false);

  const darkerInstagram = '#B30D56';
  const darkerFacebook = '#125CAD';

  const instaColorProps = useSpring({
    color: isHoveredInstagram ? darkerInstagram : '#E1306C',
  });
  const facebookColorProps = useSpring({
    color: isHoveredFacebook ? darkerFacebook : '#1877F2',
  });

  const iconStyle = { color: '#69C9D0', fontSize: '25px' };

  const handleScrollToProducts = () => {
    window.scrollTo({
      left: 0,
      top: SelectRef.current.offsetTop - 20,
      behavior: 'smooth',
    });
  };

  const TiktokIcon = () => {
    const isMobile = window.innerWidth <= 992;
    const tiktokIconShadowStyle = {
      fontSize: '30px',
      width: '25px',
      height: '25px',
    };

    return isMobile ? (
      <img src={TikTokShadowIcon} style={tiktokIconShadowStyle} alt='TikTok' />
    ) : (
      <>
        {isHoveredTiktok ? (
          <img
            src={TikTokShadowIcon}
            style={tiktokIconShadowStyle}
            alt='TikTok'
          />
        ) : (
          <FaTiktok style={tiktokIconShadowStyle} />
        )}
      </>
    );
  };

  if (!products) {
    return <div>Ładowanie...</div>;
  }

  const slides = [
    {
      image: headerImage1,
      text: 'Nowa Jakość',
      description:
        'Jesteśmy firmą specjalizującą się w sprzedaży e-papierosów i akcesoriów związanych z wapowaniem. Nasza pasja do zdrowego stylu życia i dążenie do zapewnienia wysokiej jakości produktów sprawiają, że jesteśmy idealnym partnerem dla wszystkich entuzjastów wapowania.',
      showHeading: true,
    },
    {
      image: headerImage2,
      text: 'Szybka dostawa',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque lacinia magna vel aliquam. Proin semper ex ante, ac tincidunt turpis tristique ut. Aliquam quis vulputate turpis.',
      showHeading: false,
    },
    {
      image: headerImage3,
      text: 'Niskie ceny',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque lacinia magna vel aliquam. Proin semper ex ante, ac tincidunt turpis tristique ut. Aliquam quis vulputate turpis.',
      showHeading: false,
    },
    {
      image: headerImage4,
      text: 'Gwarancja jakości',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque lacinia magna vel aliquam. Proin semper ex ante, ac tincidunt turpis tristique ut. Aliquam quis vulputate turpis.',
      showHeading: false,
    },
  ];

  const options = [
    { value: 'default', label: 'Sortuj...' },
    { value: 'priceHighToLow', label: 'Cena: najwyższa do najniższej' },
    { value: 'priceLowToHigh', label: 'Cena: najniższa do najwyższej' },
    { value: 'alphabetical', label: 'Alfabetycznie' },
  ];

  // filter

  let sortedProducts = [...products];

  switch (sortMode) {
    case 'priceHighToLow':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'priceLowToHigh':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'alphabetical':
      sortedProducts.sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
      break;
    default:
      break;
  }

  return (
    <section className='shop'>
      <Navbar style={{ zIndex: 9999 }} />
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
              <a
                href='#'
                onMouseEnter={() => setIsHoveredInstagram(true)}
                onMouseLeave={() => setIsHoveredInstagram(false)}
              >
                <animated.div
                  style={{
                    ...iconStyle,
                    ...instaColorProps,
                    transition: 'transform 0.3s ease-in-out',
                    transform: isHoveredInstagram ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  <FaInstagram />
                </animated.div>
              </a>
              <a
                href='#'
                onMouseEnter={() => setIsHoveredFacebook(true)}
                onMouseLeave={() => setIsHoveredFacebook(false)}
              >
                <animated.div
                  style={{
                    ...iconStyle,
                    ...facebookColorProps,
                    transition: 'transform 0.3s ease-in-out',
                    transform: isHoveredFacebook ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  <FaFacebook />
                </animated.div>
              </a>
              <a
                href='#'
                onMouseEnter={() => setIsHoveredTiktok(true)}
                onMouseLeave={() => setIsHoveredTiktok(false)}
              >
                <animated.div
                  style={{
                    ...iconStyle,
                    transition: 'transform 0.3s ease-in-out',
                    transform: isHoveredTiktok ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  <TiktokIcon />
                </animated.div>
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
      <div className='shop-select-container' ref={SelectRef}>
        <div className='select-wrapper'>
          <Select
            options={options}
            defaultValue={options[0]}
            isSearchable={false}
            onChange={(selectedOption) =>
              setSortMode(selectedOption.value)
            }
            styles={{
              control: (base) => ({
                ...base,
                width: '100%',
              }),
              menu: (base) => ({
                ...base,
                width: '100%',
              }),
            }}
          />
        </div>
      </div>
      <div className='products'>
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
