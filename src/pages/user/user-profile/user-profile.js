import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase-config';
import { UpdateUser } from './update-user/update-user';
import './user-profile.css'

export const User = () => {
  const [user, loading, error] = useAuthState(auth);
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false)

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

	const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [userFavourites, setUserFavourites] = useState([]);

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

  const handleOpenModal = () => {
    setIsUpdateModalOpen(userData);
		setIsEditMode(true)
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
		setIsEditMode(false)
  };

	return (
    <section className="user">
      <div className='box user-data'>
        <h2 className="user-title">Dane użytkownika</h2>
        {!isEditMode && userData && (
          <div className='user-info-container'>
            <p className="user-info"><b>Imię:</b> {userData.firstName}</p>
<p className="user-info"><b>Nazwisko:</b> {userData.lastName}</p>
<p className="user-info"><b>Email:</b> {userData.email}</p>
<p className="user-info"><b>Miasto:</b> {userData.city}</p>
<p className="user-info"><b>Ulica i nr domu:</b> {userData.street}</p>
<p className="user-info"><b>Kod pocztowy:</b> {userData.postalCode}</p>

            <button className="user-edit-btn" onClick={handleOpenModal}>Edytuj dane użytkownika</button>
						</div>
        )}
        {isUpdateModalOpen && <UpdateUser onClose={handleCloseModal} userData={isUpdateModalOpen} />}
      </div>
			<div className="box user-order-story">
        <h2 className=" user-title">Historia zamówień</h2>
        {userOrderHistory.length === 0 ? (
          <p>Brak zamówień</p>
        ) : (
          <div></div>
        )}
      </div>
      <div className='box user-favourite'>
        <h2 className=" user-title">Ulubione</h2>
        {userFavourites.length === 0 ? (
          <p>Brak ulubionych produktów</p>
        ) : (
      <div></div>
        )}
      </div>
    </section>
  );
};