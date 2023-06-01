import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../../context/shop-context';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { doc, onSnapshot } from 'firebase/firestore';
import ModalImage from 'react-modal-image';
import { LoginModal } from '../../../components/login-modal';

import { AddToCartModal } from '../../../components/add-to-cart-modal';
import './product-details.css';

export const ProductDetails = () => {
  const navigate = useNavigate()
	const { id } = useParams();
	const {
		addToCart,
		cartItems,
		products,
		addToFavorites,
		removeFromFavorites,
		favorites,
		auth,
		db,
		showLoginModal,
		closeLoginModal,
		isLoginModalVisible,
		removeFromCart,
		updateCartItemCount,
    validateCartItemCount,
	} = useContext(ShopContext);


	const product = products.find((product) => product.id === Number(id));

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const [isFavorite, setIsFavorite] = useState(favorites && favorites[id]);

  const [isMaxQuantity, setIsMaxQuantity] = useState(false);

	const handleAddToCart = () => {
    let newQuantity = (cartItems[id] || 0) + quantity;
    if(newQuantity <= availability) {
      for(let i=0; i<quantity; i++) {
        validateCartItemCount(newQuantity, id);
      }
      setIsMaxQuantity(false);
    } else {
      setIsMaxQuantity(true);
    }
		setIsModalVisible(true);
  }

  const handleIncrementQuantity = () => {
    let newQuantity = quantity + 1;
    if(newQuantity <= availability) {
      setQuantity(newQuantity);
      setIsMaxQuantity(false);
    } else {
      setIsMaxQuantity(true);
    }
  }

	const handleCloseCartModal = () => {
		setIsModalVisible(false);
		closeLoginModal();
    navigate('/')
	};

	useEffect(() => {
		let unsubscribe;

		if (auth.currentUser && db) {
			unsubscribe = onSnapshot(
				doc(db, 'users', auth.currentUser.uid),
				(doc) => {
					const userData = doc.data();

					if (userData && userData.hasOwnProperty('favorites')) {
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

	if (!product) {
		return <div>Produkt nie znaleziony</div>;
	}

	const {
		productName,
		price,
		productImage,
		description,
		availability,
		discount,
		oldPrice,
	} = product;
	const cartItemAmount = cartItems[id];

	return (
		<section className='details'>
			<div className='details-img'>
				<ModalImage
					small={productImage}
					large={productImage}
					alt={productName}
				/>
			</div>
			<div className='details-description'>
				<h2>{productName}</h2>
				<div className='details-add-to-fav-container'>
					<button className='details-add-to-fav' onClick={handleClickAddToFav}>
						{isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
					</button>
					<p>Dodaj do ulubionych</p>
				</div>
				<p className='details-description-text'>{description}</p>
				{discount ? (
					<>
						<p className='product-discount-old-price-details'>
							Stara cena: {oldPrice} zł
						</p>
						<p className='product-discount-actual-price-details'>
							Nowa cena: {price} zł{' '}
						</p>
					</>
				) : (
					<p className='product-discount-actual-price-details'>
						Cena: {price} zł
					</p>
				)}
				<p className='details-availability'>Dostępna ilość: {availability}</p>
				<div className='details-count-handler'>
					<button className='details-count-handler-btn'
						onClick={() =>
							setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
						}
					>
						{' '}
						-{' '}
					</button>
					<input className='details-count-handler-input'value={quantity} readOnly />
			
          <button className='details-count-handler-btn' onClick={handleIncrementQuantity}> + </button>
          <button className='details-add-to-cart-btn' onClick={handleAddToCart}>
					Dodaj do koszyka
				</button>
        
				</div>
        {isMaxQuantity && <p className='details-max-info'>Osiągnięto maksymalną liczbę dostępnych produktów</p>}
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
			/>
		</section>
	);
};
