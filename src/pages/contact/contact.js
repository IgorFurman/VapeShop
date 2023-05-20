import React, { useState } from 'react';
import './contact.css';
import { AiOutlineMail } from 'react-icons/ai';

import { app } from '../../config/firebase-config';

import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  const db = getFirestore(app);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: name,
        email: email,
        message: message,
        timestamp: serverTimestamp(),
      });
      setIsMessageSent(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className='contact'>
      <div className={`contact-img ${isMessageSent ? 'animate' : ''}`}>
        <AiOutlineMail size={440} />
      </div>
      <form className='contact-form' onSubmit={handleSubmit}>
        {isMessageSent && <p className='contact-popup'>Wiadomość została wysłana</p>}
        <label className='contact-label'>
          Imię:
          <input
            className='contact-input'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className='contact-label'>
          Email:
          <input
            className='contact-input'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className='contact-label'>
          Wiadomość:
          <textarea
            className='contact-textarea'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button className='contact-send-btn' type='submit'>
          Wyślij
        </button>
      </form>
    </section>
  );
};
