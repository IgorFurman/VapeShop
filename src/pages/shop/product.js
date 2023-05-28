import React, { useContext, useState, useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import AOS from 'aos';
import 'aos/dist/aos.css'; 

import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import BestSellerIcon from '../../assets/icon/bestseller-icon.png';

import { LoginModal } from '../../components/login-modal';
import { AddToCartModal } from '../../components/add-to-cart-modal';

import './shop&product.css';

export const Product = (props) => {
	const {
		id,
		productName,
		price,
		productImage,
		bestseller,
		discount,
		oldPrice,
	} = props.data;
	const {
		addToCart,
		cartItems,
		removeFromCart,
		updateCartItemCount,
		addToFavorites,
		removeFromFavorites,
		showLoginModal,
		closeLoginModal,
		isLoginModalVisible,
		favorites,
		auth,
		db,
	} = useContext(ShopContext);
   // AOS ANIMATION 

useEffect(() => {
  AOS.init({
    once: true,
    duration : 1000
  });
}, []);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorites && favorites[id]);

	const handleAddToCart = () => {
		addToCart(id);
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
		closeLoginModal();
	};

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleClickLink = () => {
		setTimeout(() => {
			handleScrollToTop();
		}, 0);
	};

	const handleClickAddToFav = (e) => {
		if (auth.currentUser) {
			if (isFavorite) {
				removeFromFavorites(id);
				setIsFavorite(false);
			} else {
				addToFavorites(id);
				setIsFavorite(true);
			}
		} else {
			showLoginModal();
		}
	};

  const calculateDiscountPercentage = (originalPrice, currentPrice) => {
    const discount = originalPrice - currentPrice;
    const discountPercentage = (discount / originalPrice) * 100;
  
    return Math.round(discountPercentage);
  };

	useEffect(() => {
		let unsubscribe;

		

		if (auth.currentUser && db) {
			unsubscribe = onSnapshot(
				doc(db, 'users', auth.currentUser.uid),
				(doc) => {
					const userData = doc.data();

					if (userData && userData.hasOwnProperty('favorites')) {
						console.log('userData.favorites:', userData.favorites);
						setIsFavorite(!!userData.favorites[id]);
					}
				},
				(error) => {
					console.error('Error while fetching user data: ', error);
				}
			);
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [auth, db, id, favorites]);

	return (
		<>
			<div className='product' data-aos-anchor-placement="top-bottom" data-aos="fade-up">
				<Link
					to={`/products/${id}`}
					onClick={handleClickLink}
					className='product-link'
				>
					<img src={productImage} alt={productName} />

          {discount && (
          <div className='product-discount-badge'>
            {calculateDiscountPercentage(oldPrice, price)}%
          </div>
        )}

					{bestseller && (
						<img
							src={BestSellerIcon}
							alt='ikona bestseller'
							className='best-seller-icon'
							style={{ width: '50px', height: '50px' }}
						/>
					)}
					<div className='image-hover-text'>Szybki podgląd</div>
				</Link>
				<div className='product-description'>
					<p>
						<b>{productName}</b>
					</p>
					{discount ? (
						<>
							<p className='product-discount-old-price'>{oldPrice} zł</p>
							<p className='product-discount-new-price'>{price} zł </p>
						</>
					) : (
						<p>{price} zł</p>
					)}
				</div>
				<button className=' add-to-cart-btn' onClick={handleAddToCart}>
					Dodaj do koszyka{' '}
					{cartItems && cartItems[id] > 0 && <>({cartItems[id]})</>}
				</button>
				<button className='add-to-fav-btn' onClick={handleClickAddToFav}>
					{isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
				</button>
			</div>
			<LoginModal
				isVisible={isLoginModalVisible}
				closeLoginModal={closeLoginModal}
			/>
			<AddToCartModal
				isModalVisible={isModalVisible}
				handleCloseModal={handleCloseModal}
				productName={productName}
				productImage={productImage}
				cartItems={cartItems}
				addToCart={addToCart}
				removeFromCart={removeFromCart}
				updateCartItemCount={updateCartItemCount}
				id={id}
			/>
		</>
	);
};
