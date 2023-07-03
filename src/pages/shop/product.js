import React, { useContext, useState, useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'

import AOS from 'aos';
import 'aos/dist/aos.css'; 

import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import BestSellerIcon from '../../assets/icon/bestseller-icon.png';

import { LoginModal } from '../../components/login-modal/login-modal';
import { AddToCartModal } from '../../components/add-to-cart-modal/add-to-cart-modal';

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
		availability,
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
		validateCartItemCount,
		calculateDiscountPercentage,
	} = useContext(ShopContext);


useEffect(() => {
  AOS.init({
    once: true,
    duration : 1000
  });
}, []);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorites && favorites[id]);
	const [isMaxQuantity, setIsMaxQuantity] = useState(false);


	
	const handleAddToCart = () => {
		let newQuantity = (cartItems[id] || 0) + 1;
		if(newQuantity > availability) {
			setIsMaxQuantity(true);
	
		} else {
			validateCartItemCount(newQuantity, id);
			setIsMaxQuantity(false);
		}
		setIsModalVisible(true);
	}

	const handleCloseCartModal = () => {
		setIsModalVisible(false);
		closeLoginModal();
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
					className='product-link'
				>
					<LazyLoadImage src={productImage} alt={productName} effect="blur"/>

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
				<button className=' add-to-cart-btn' onClick={handleAddToCart} disabled={isMaxQuantity}>
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
  handleCloseModal={handleCloseCartModal}
  productName={productName}
  productImage={productImage}
  cartItems={cartItems && cartItems}
  addToCart={addToCart}
  removeFromCart={removeFromCart}
  updateCartItemCount={updateCartItemCount}
  id={id}
  maxQuantityReached={true}
/>
		</>
	);
};
