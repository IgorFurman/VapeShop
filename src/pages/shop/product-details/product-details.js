import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../../context/shop-context';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { doc, onSnapshot } from 'firebase/firestore';
import ModalImage from 'react-modal-image';
import {LoginModal} from '../../../components/login-modal'
import './product-details.css';

export const ProductDetails = () => {
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

	} = useContext(ShopContext);
	const product = products.find((product) => product.id === Number(id));
console.log(auth.currentUser);
const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorites && favorites[id]);



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
      
				<button
					className='details-add-to-bart-btn'
					onClick={() => addToCart(id)}
				>
					Dodaj do koszyka {cartItemAmount > 0 && <>({cartItemAmount})</>}
				</button>
			</div>
      <LoginModal
				isVisible={isLoginModalVisible}
				closeLoginModal={closeLoginModal}
			/>
		</section>
	);
};
