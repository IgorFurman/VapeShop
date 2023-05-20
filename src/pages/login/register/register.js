import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase-config';

import './register.css'

export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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

    if (password !== passwordRepeat) {
      setError('Hasła nie są zgodne');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('Użytkownik zarejestrowany:', userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
		<div className='register'>
			<h2>Rejestracja</h2>
			<form className='register-form' onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input type='email' value={email} onChange={handleEmailChange} />
				</div>
				<div>
					<label>Hasło:</label>
					<input
						type='password'
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div>
					<label>Powtórz hasło:</label>
					<input
						type='password'
						value={passwordRepeat}
						onChange={handlePasswordRepeatChange}
					/>
				</div>
				<div>
					<label>Imię:</label>
					<input type='text' value={firstName} onChange={handleFirstNameChange} />
				</div>
				<div>
					<label>Nazwisko:</label>
					<input type='text' value={lastName} onChange={handleLastNameChange} />
				</div>
				<div>
					<label>Adres:</label>
					<input type='text' value={address} onChange={handleAddressChange} />
				</div>
				<div>
					<label>Ulica:</label>
					<input type='text' value={street} onChange={handleStreetChange} />
				</div>
				<div>
					<label>Miasto:</label>
					<input type='text' value={city} onChange={handleCityChange} />
				</div>
				<div>
					<label>Kod pocztowy:</label>
					<input type='text' value={postalCode} onChange={handlePostalCodeChange} />
				</div>
				<button type='submit'>Zarejestruj</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
}
