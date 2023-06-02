import React, { useState, useEffect } from 'react';
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	OAuthProvider,
} from 'firebase/auth';
import { auth } from '../../../config/firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import './login.css';

export const LoginForm = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			console.log('Użytkownik zalogowany:', userCredential.user);
			navigate(`/profile/${userCredential.user.uid}`);
		} catch (error) {
			console.log(error);
			if (error.code === 'auth/invalid-email') {
				setError('Podany email jest nieprawidłowy.');
			} else if (error.code === 'auth/user-not-found') {
				setError('Nie znaleziono użytkownika o podanym emailu.');
			} else if (error.code === 'auth/wrong-password') {
				setError('Podane hasło jest nieprawidłowe.');
			} else {
				setError(
					'Wystąpił nieoczekiwany błąd. Proszę spróbować ponownie później.'
				);
			}
		}
	};


	useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

	// !!!!!!!! DOKOŃCZYĆ WERYFIKACJE TYMI PLATFORMAMI !!!!!!!!!!===//

	const handleSignInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const userCredential = await signInWithPopup(auth, provider);
			console.log('Zalogowano za pomocą konta Google:', userCredential.user);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleSignInWithFacebook = async () => {
		const provider = new FacebookAuthProvider();
		try {
			const userCredential = await signInWithPopup(auth, provider);
			console.log('Zalogowano za pomocą konta Facebook:', userCredential.user);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleSignInWithApple = async () => {
		const provider = new OAuthProvider('apple.com');
		try {
			const userCredential = await signInWithPopup(auth, provider);
			console.log('Zalogowano za pomocą konta Apple:', userCredential.user);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className='container'>
			<div className='form-container sign-in-container'>
				<form className='login-form' onSubmit={handleSubmit}>
					<h1>Zaloguj się</h1>

					<input
						type='email'
						value={email}
						onChange={handleEmailChange}
						placeholder='Email'
					/>

					<input
						type='password'
						value={password}
						onChange={handlePasswordChange}
						placeholder='Hasło'
					/>
					{error && <div className='error-message'>{error}</div>}
					<button type='submit'>Zaloguj</button>
					<Link to='/register'>Nie masz konta? Zarejestruj się tutaj</Link>

					<div className='login-socials'>
						<FaFacebook
							className='social-icon'
							onClick={handleSignInWithFacebook}
						/>
						<FaGoogle
							className='social-icon'
							onClick={handleSignInWithGoogle}
						/>
						<FaApple className='social-icon' onClick={handleSignInWithApple} />
					</div>
				</form>
			</div>
		</div>
	);
};
