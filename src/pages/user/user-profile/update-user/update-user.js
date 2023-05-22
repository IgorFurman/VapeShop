import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../config/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebase-config';

import '../user-profile.css';

export const UpdateUser = ({ onClose, userData }) => {
	const [user] = useAuthState(auth);

	const [newPassword, setNewPassword] = useState('');
  const [profile, setProfile] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    city: userData.city || '',
    street: userData.street || '',
    postalCode: userData.postalCode || '',
  });

	const handleChangePassword = async () => {
		try {
			if (user) {
				await user.updatePassword(newPassword);
				alert('Hasło zostało zaktualizowane!');
			}
		} catch (error) {
			console.error('Błąd podczas aktualizacji hasła: ', error);
		}
	};

	const handleChangeProfile = async () => {
		try {
			if (user) {
				await setDoc(doc(db, 'users', user.uid), profile);
				alert('Profil został zaktualizowany!');
			}
		} catch (error) {
			console.error('Błąd podczas aktualizacji profilu: ', error);
		}
	};

	const handleChange = (e) => {
		setProfile({
			...profile,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='update-user'>
			<h2 className='update-user-title'>Aktualizuj hasło</h2>
			<input
				type='password'
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
			/>
			<button 
      className="update-user-btn"
      onClick={handleChangePassword}>Aktualizuj hasło</button>

			<h2 className='update-user-title'>Aktualizuj profil</h2>
			<input
				type='text'
				name='firstName'
				value={profile.firstName}
				onChange={handleChange}
				placeholder='Imię'
			/>
			<input
				type='text'
				name='lastName'
				value={profile.lastName}
				onChange={handleChange}
				placeholder='Nazwisko'
			/>
			<input
				type='text'
				name='email'
				value={profile.email}
				onChange={handleChange}
				placeholder='Email'
			/>
			<input
				type='text'
				name='city'
				value={profile.city}
				onChange={handleChange}
				placeholder='Miasto'
			/>
			<input
				type='text'
				name='street'
				value={profile.street}
				onChange={handleChange}
				placeholder='Ulica'
			/>
			<input
				type='text'
				name='postalCode'
				value={profile.postalCode}
				onChange={handleChange}
				placeholder='Kod pocztowy'
			/>
			<button className='update-user-btn' onClick={handleChangeProfile}>
				Aktualizuj profil
			</button>
			<button className='update-user-close' onClick={onClose}>
				Zamknij
			</button>
		</div>
	);
};
