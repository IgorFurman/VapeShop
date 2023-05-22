import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase-config';

import './user-profile.css'

export const User = () => {
  const [user, loading, error] = useAuthState(auth);
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        setUserData(doc.data());
        setUserLoading(false);
      }, (error) => {
        setUserError(error);
        setUserLoading(false);
      });

      
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <section className="user">
			<div className='user-data'>
      <h2 className="user-title">Dane użytkownika</h2>
      {userData && (
        <>
          <p className="user-info">Imię: {userData.firstName}</p>
          <p className="user-info">Nazwisko: {userData.lastName}</p>
          <p className="user-info">Email: {userData.email}</p>
          <p className="user-info">Miasto: {userData.city}</p>
          <p className="user-info">Ulica: {userData.street}</p>
          <p className="user-info">Kod pocztowy: {userData.postalCode}</p>
        </>
      )}
			</div>
			<div className="user-order-story">
      <h2 className="user-title">Historia zamówień</h2>
      {/* {orders.map((order, index) => (
        <p key={index}>{order}</p>
      ))} */}
			</div>
			<div className='user-favourite'>
      <h2 className="user-title">Ulubione</h2>
      {/* {favorites.map((favorite, index) => (
        <p key={index}>{favorite}</p>
      ))} */}
			</div>
      {/* Add a button or form for updating password and user data */}


      {/* It can be a separate component which uses Firebase's updatePassword and updateProfile functions. */}
    </section>
  );
};
