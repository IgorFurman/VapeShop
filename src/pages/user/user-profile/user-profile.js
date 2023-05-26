import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase-config';
import { UpdateUser } from './update-user/update-user';
import './user-profile.css';

export const User = () => {
	const [user, loading, error] = useAuthState(auth);
	const { id } = useParams();

	const [userData, setUserData] = useState(null);
	const [userLoading, setUserLoading] = useState(true);
	const [userError, setUserError] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);

	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

	const [userOrderHistory, setUserOrderHistory] = useState([]);
	const [userFavourites, setUserFavourites] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			const unsubscribe = onSnapshot(
				doc(db, 'users', user.uid),
				(doc) => {
					setUserData(doc.data());
					setUserLoading(false);
				},
				(error) => {
					setUserError(error);
					setUserLoading(false);
				}
			);

			return () => unsubscribe();
		}
	}, [user]);

	useEffect(() => {
		if (userData) {
			let favorites = userData.favorites;

			if (!Array.isArray(favorites)) {
				if (typeof favorites === 'object' && favorites !== null) {
					favorites = Object.keys(favorites)
						.filter((key) => favorites[key])
						.map(Number);
				} else {
					console.error(
						'Favorites should be an array or object, got: ',
						favorites
					);
					return;
				}
			}

			const productDocRefs = favorites.map((id) => {
				console.log(`productId: ${id}`);
				return doc(db, 'products', String(id));
			});
			if (Array.isArray(productDocRefs) && productDocRefs.length > 0) {
				const getFavoriteProducts = async () => {
					try {
						const favoriteProductDocs = await Promise.all(
							productDocRefs.map((productRef) =>
								getDoc(productRef).catch((error) =>
									console.log('Błąd odczytu dokumentu', error)
								)
							)
						);

						const favoriteProductsData = favoriteProductDocs
							.filter((doc) => doc.exists)
							.map((doc) => ({ id: doc.id, ...doc.data() }));

						setUserFavourites(favoriteProductsData);
						console.log(favoriteProductsData);
					} catch (error) {
						console.error('Błąd podczas odczytu ulubionych produktów', error);
					}
				};

				getFavoriteProducts();
			}
		}
	}, [userData]);

	const handleOpenModal = () => {
		setIsUpdateModalOpen(userData);
		setIsEditMode(true);
	};

	const handleCloseModal = () => {
		setIsUpdateModalOpen(false);
		setIsEditMode(false);
	};

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			navigate('/login');
		} catch (error) {
			console.error('Wystąpił błąd podczas wylogowywania.', error);
		}
	};

	return (
		<>
			<section className='user'>
				<div className='box user-data'>
					<h2 className='user-title'>Dane użytkownika</h2>
					{!isEditMode && userData && (
						<div className='user-info-container'>
							<p className='user-info'>
								<b>Imię:</b> {userData.firstName}
							</p>
							<p className='user-info'>
								<b>Nazwisko:</b> {userData.lastName}
							</p>
							<p className='user-info'>
								<b>Email:</b> {userData.email}
							</p>
							<p className='user-info'>
								<b>Miasto:</b> {userData.city}
							</p>
							<p className='user-info'>
								<b>Ulica i nr domu:</b> {userData.street}
							</p>
							<p className='user-info'>
								<b>Kod pocztowy:</b> {userData.postalCode}
							</p>

							<button className='user-edit-btn' onClick={handleOpenModal}>
								Edytuj dane użytkownika
							</button>
						</div>
					)}
					{isUpdateModalOpen && (
						<UpdateUser
							onClose={handleCloseModal}
							userData={isUpdateModalOpen}
						/>
					)}
				</div>
				<div className='box user-order-story'>
					<h2 className=' user-title'>Historia zamówień</h2>
					{userOrderHistory.length === 0 ? <p>Brak zamówień</p> : <div></div>}
				</div>
				<div className='box user-favourite'>
					<h2 className=' user-title'>Ulubione</h2>
					{userFavourites.length === 0 ? (
						<p>Brak ulubionych produktów</p>
					) : (
						userFavourites.map((product, index) => (
							<div className='user-favourite-list' key={index}>
								<div className='user-favourite-name'>
									<h3>{product.productName}</h3>
									<Link
										className='user-favourite-link'
										to={`/products/${product.id}`}
									>
										Zobacz szczegóły
									</Link>
								</div>
								<img
									className='user-favourite-image'
									src={product.productImage}
									alt={product.productName}
								/>
							</div>
						))
					)}
				</div>
			</section>
			<div className='user-logut-container'>
				<button className='user-logout-btn' onClick={handleSignOut}>
					Wyloguj się
				</button>
			</div>
		</>
	);
};
