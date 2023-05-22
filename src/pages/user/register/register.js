import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../config/firebase-config';
import { Link } from 'react-router-dom';

import { doc, setDoc } from 'firebase/firestore';


import { FaAngellist } from "react-icons/fa";
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
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

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
          console.error("Error writing user data to Firestore: ", error);
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='register'>
      {isRegistered ? (
        <div className='register-success'>
          <FaAngellist className='register-success-icon'size={200} />
          <h2>Rejestracja przebiegła pomyślnie</h2>
         
          <Link className='register-success-link'to='/login'>Kliknij tutaj żeby się zalogować</Link>
        </div>
      ) : (
        <>
          <h2>Rejestracja</h2>
          <form className='register-form' onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type='email'
                className='register-input'
                value={email}
                onChange={handleEmailChange}
                placeholder='przykład@mail.com'
                required
              />
            </div>
            <div>
              <label>Hasło:</label>
              <input
                type='password'
                className='register-input'
                value={password}
                onChange={handlePasswordChange}
                placeholder='******'
                required
              />
            </div>
            <div>
              <label>Powtórz hasło:</label>
              <input
                type='password'
                className='register-input'
                value={passwordRepeat}
                onChange={handlePasswordRepeatChange}
                placeholder='******'
                required
              />
            </div>
            <div>
              <label>Imię:</label>
              <input
                type='text'
                className='register-input'
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder='John'
              />
            </div>
            <div>
              <label>Nazwisko:</label>
              <input
                type='text'
                className='register-input'
                value={lastName}
                onChange={handleLastNameChange}
                placeholder='Doe'
              />
            </div>
            <div>
              <label>Ulica:</label>
              <input
                type='text'
                className='register-input'
                value={street}
                onChange={handleStreetChange}
                placeholder='Przykładowa'
              />
            </div>
            <div>
              <label>Miasto:</label>
              <input
                type='text'
                className='register-input'
                value={city}
                onChange={handleCityChange}
                placeholder='Warszawa'
              />
            </div>
            <div>
              <label>Kod pocztowy:</label>
              <input
                type='text'
                className='register-input'
                value={postalCode}
                onChange={handlePostalCodeChange}
                placeholder='00-000'
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
          </form>
          {error && <p className='register-error'>{error}</p>}
        </>
      )}
    </div>
  );
};
