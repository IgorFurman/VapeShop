import React, { useState } from 'react';
import './contact.css';

import contactImg from '../../assets/form-img.png'

export const Contact = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
		setName('');
		setEmail('');
		setMessage('');
	};

	return (
        <section className ='contact'>
        <div className='contact-img'><img src={contactImg} alt="" /></div>
		<form className='contact-form' onSubmit={handleSubmit}>
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
