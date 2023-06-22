import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../config/firebase-config';
import { Link } from 'react-router-dom';

import { doc, setDoc } from 'firebase/firestore';

import { FaAngellist } from 'react-icons/fa';
import './register.css';

export const RegistrationForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [isRegistered, setIsRegistered] = useState(false);

	const [networkError, setNetworkError] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleFirstNameChange = (e) => {
		setFirstName(e.target.value);
	};

	const handleLastNameChange = (e) => {
		setLastName(e.target.value);
	};

	const handlePasswordRepeatChange = (e) => {
		setPasswordRepeat(e.target.value);
	};

	const handleStreetChange = (e) => {
		setStreet(e.target.value);
	};

	const handleCityChange = (e) => {
		setCity(e.target.value);
	};

	const handlePostalCodeChange = (e) => {
		setPostalCode(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let errors = {};

		const emailRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		if (!emailRegEx.test(email)) {
			errors.email = 'Nieprawidłowy adres email';
		}

		if (password.length < 6) {
			errors.password = 'Hasło musi mieć co najmniej 6 znaków';
		}

		if (firstName.length === 0) {
			errors.firstName = 'Imię jest wymagane';
		}

		if (lastName.length === 0) {
			errors.lastName = 'Nazwisko jest wymagane';
		}
		if (street.length === 0) {
			errors.street = 'Podaj nazwę ulicy';
		}
		if (city.length === 0) {
			errors.city = 'Podaj miasto';
		}

		const postalCodeRegEx = /^\d{2}-\d{3}$/;
		if (!postalCodeRegEx.test(postalCode)) {
			errors.postalCode =
				'Nieprawidłowy kod pocztowy. Wymagany format to 00-000.';
		}

		if (password !== passwordRepeat) {
			errors.passwordRepeat = 'Hasła nie są zgodne';
		}

    setFormErrors(errors);
    console.log(errors)

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;

			if (user) {
				setIsRegistered(true);

				const docRef = doc(db, 'users', user.uid);

				setDoc(docRef, {
					email: email,
					firstName: firstName,
					lastName: lastName,
					street: street,
					city: city,
					postalCode: postalCode,
				}).catch((error) => {
          setNetworkError(error.message);
				});
			}
		} catch (error) {
			console.log(error.message);;
		}
	};

	return (
		<div className='register'>
			{isRegistered ? (
				<div className='register-success'>
					<FaAngellist className='register-success-icon' size={200} />
					<h2>Rejestracja przebiegła pomyślnie</h2>

					<Link className='register-success-link' to='/login'>
						Kliknij tutaj żeby się zalogować
					</Link>
				</div>
			) : (
				<>
					<h2>Rejestracja</h2>
					<form className='register-form' onSubmit={handleSubmit}>
						<div className='register-form-box'>
							<label>Email:</label>
							<input
								type='email'
								className='register-input'
								value={email}
								onChange={handleEmailChange}
								placeholder='przykład@mail.com'
								
								autoComplete='email'
							/>
							
						</div>
						<div className='register-form-box'>
							<label>Hasło:</label>
							<input
								type='password'
								className='register-input'
								value={password}
								onChange={handlePasswordChange}
								placeholder='******'
							
								autoComplete='new-password'
							/>
							
						</div>
						<div className='register-form-box'>
							<label>Powtórz hasło:</label>
							<input
								type='password'
								className='register-input'
								value={passwordRepeat}
								onChange={handlePasswordRepeatChange}
								placeholder='******'
							
							/>
						</div>
						<div className='register-form-box'>
							<label>Imię:</label>
							<input
								type='text'
								className='register-input'
								value={firstName}
								onChange={handleFirstNameChange}
								placeholder='Jan'
								autoComplete='given-name'
							/>
						</div>
					
						<div className='register-form-box'>
							<label>Nazwisko:</label>
							<input
								type='text'
								className='register-input'
								value={lastName}
								onChange={handleLastNameChange}
								placeholder='Kowalski'
								autoComplete='family-name'
							/>
						</div>
					
						<div className='register-form-box'>
							<label>Ulica i nr domu:</label>
							<input
								type='text'
								className='register-input'
								value={street}
								onChange={handleStreetChange}
								placeholder='Przykładowa'
								autoComplete='street-address'
							/>
						</div>
					
						<div className='register-form-box'>
							<label>Miasto:</label>
							<input
								type='text'
								className='register-input'
								value={city}
								onChange={handleCityChange}
								placeholder='Warszawa'
								autoComplete='address-level2'
							/>
						</div>
					
						<div className='register-form-box'>
							<label>Kod pocztowy:</label>
							<input
								type='text'
								className='register-input'
								value={postalCode}
								onChange={handlePostalCodeChange}
								placeholder='00-000'
								autoComplete='postal-code'
							/>
						</div>
						
						<div className='gender__details'>
							<span className='gender__title'>Płeć:</span>
							<div className='category'>
								<label htmlFor='dot-1'>
									<input type='radio' name='gender' id='dot-1' />
									<span className='dot one'></span>
									<span>Mężczyzna</span>
								</label>
								<label htmlFor='dot-2'>
									<input type='radio' name='gender' id='dot-2' />
									<span className='dot two'></span>
									<span>Kobieta</span>
								</label>
								<label htmlFor='dot-3'>
									<input type='radio' name='gender' id='dot-3' />
									<span className='dot three'></span>
									<span>Nie chcę podawać</span>
								</label>
							</div>
						</div>
						<button type='submit' className='register-button'>
							Zarejestruj
						</button>
            <div className='register-input-error-box'>
<ol>
            {formErrors.email && (
                            <li className='register-input-error'>{formErrors.email}</li>
                        )}
                        {formErrors.password && (
                            <li className='register-input-error'>{formErrors.password}</li>
                        )}
                        {formErrors.passwordRepeat && (
                            <li className='register-input-error'>{formErrors.passwordRepeat}</li>
                        )}
                        {formErrors.firstName && (
                            <li className='register-input-error'>{formErrors.firstName}</li>
                        )}
                        {formErrors.lastName && (
                            <li className='register-input-error'>{formErrors.lastName}</li>
                        )}
                        {formErrors.street && (
                            <li className='register-input-error'>{formErrors.street}</li>
                        )}
                        {formErrors.city && (
                            <li className='register-input-error'>{formErrors.city}</li>
                        )}
                        {formErrors.postalCode && (
                            <li className='register-input-error'>{formErrors.postalCode}</li>
                        )}
                        </ol>
                        </div>
					</form>
					
				</>
			)}
		</div>
	);
};


