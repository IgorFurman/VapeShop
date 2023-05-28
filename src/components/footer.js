import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSpring, animated } from 'react-spring';
import { useMediaQuery } from 'react-responsive';

import { app } from '../config/firebase-config';
import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore';

import {
	FaPhoneAlt,
	FaEnvelopeOpenText,
	FaInstagram,
	FaFacebook,
	FaTiktok,
	FaWpforms,
} from 'react-icons/fa';
import { GiSmokeBomb } from 'react-icons/gi';
import { GrMap } from 'react-icons/gr';

import './footer.css';
import LogoFooter from '../assets/icons8-vape-60-white.png';
import TikTokShadowIcon from '../assets/icon/tiktok-color-icon.png';

const handleScrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

const handleScrollAndRedirect = (path, navigate) => {
	handleScrollToTop();
	navigate(path);
};

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	const iconStyle = { color: '#ffffff', fontSize: '30px' };
	const [email, setEmail] = useState('');
	const [isSubscribed, setIsSubscribed] = useState(false);

	const location = useLocation();
	const pathsToExclude = [
		'/profile',
		'/login',
		'/register',
		'/contact',
		'/products',
	];
	const showNewsletter = !pathsToExclude.some((path) =>
		location.pathname.startsWith(path)
	);

	const db = getFirestore(app);

	const handleNewsletterSubmit = async (e) => {
		e.preventDefault();

		try {
			const docRef = await addDoc(collection(db, 'newsletter'), {
				email: email,
				timestamp: serverTimestamp(),
			});
			setIsSubscribed(true);
			setEmail('');
		} catch (error) {
			alert(error.message);
		}
	};

	const isMobile = useMediaQuery({ maxWidth: 992 });

	// hover icons

	const [isHoveredInstagram, setIsHoveredInstagram] = useState(false);
	const [isHoveredFacebook, setIsHoveredFacebook] = useState(false);
	const [isHoveredTiktok, setIsHoveredTiktok] = useState(false);

	const darkerInstagram = '#B30D56';
	const darkerFacebook = '#125CAD';

	const instaColorProps = useSpring({
		color: isHoveredInstagram ? darkerInstagram : '#E1306C',
	});
	const facebookColorProps = useSpring({
		color: isHoveredFacebook ? darkerFacebook : '#1877F2',
	});

	const tiktokIconShadowStyle = {
		fontSize: '30px',
		width: '30px',
		height: '30px',
	};
  const TiktokIcon = () => {
    return isMobile ? (
        <img src={TikTokShadowIcon} style={tiktokIconShadowStyle} alt='TikTok' />
    ) : (
        isHoveredTiktok ? 
        <img src={TikTokShadowIcon} style={tiktokIconShadowStyle} alt='TikTok' /> : 
        <FaTiktok style={tiktokIconShadowStyle} />
    );
};

	return (
		<>
			{showNewsletter && (
				<div className='newsletter-footer'>
					<h2 className='newsletter-heading'>Zapisz się na nasz newsletter!</h2>
					<p className='newsletter-info'>
						Otrzymuj najnowsze informacje o naszych promocjach i nowościach.
					</p>
					{isSubscribed ? (
						<p className='newsletter-success'>
							Dziękujemy za zapisanie się na newsletter!
						</p>
					) : (
						<form className='newsletter-form' onSubmit={handleNewsletterSubmit}>
							<input
								type='email'
								placeholder='Twój adres e-mail'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<button type='submit'>Zapisz się</button>
						</form>
					)}
				</div>
			)}

			<div className='main-footer'>
				<div className='logoinfo'>
					<h2>
						<img src={LogoFooter} alt='BigCloud Logo' />
						BigCloud
					</h2>
					<a target='_blank' href='https://icons8.com/icon/PZ8cqf92g6gy/vape'>
						Vape icon by
					</a>{' '}
					<a target='_blank' href='https://icons8.com'>
						Icons8
					</a>
				</div>
				<div className='contact-details'>
					<h3>Kontakt</h3>
					<ul>
						<li>
							<FaPhoneAlt style={iconStyle} />{' '}
							<a href='tel:+919326048690'>+91 0987654321</a>
						</li>
						<li>
							<FaEnvelopeOpenText style={iconStyle} />
							<a href='mailto:massivecloud@gmail.com'>massivecloud@gmail.com</a>
						</li>
						<li>
							<FaWpforms style={iconStyle} />
							<Link
								to='/contact'
								onClick={() => handleScrollAndRedirect('/contact')}
							>
								Wypełnij formularz
							</Link>
						</li>
					</ul>
				</div>

				<div className='social'>
					<h3>Social Media</h3>
					<div className='sociallogos'>
						<a
							href='#'
							onMouseEnter={() => setIsHoveredInstagram(true)}
							onMouseLeave={() => setIsHoveredInstagram(false)}
						>
							<animated.div
								style={{
									...iconStyle,
									...instaColorProps,
									transition: 'transform 0.3s ease-in-out',
									transform: isHoveredInstagram ? 'scale(1.2)' : 'scale(1)',
								}}
							>
								<FaInstagram />
							</animated.div>
						</a>

						<a
							href='#'
							onMouseEnter={() => setIsHoveredFacebook(true)}
							onMouseLeave={() => setIsHoveredFacebook(false)}
						>
							<animated.div
								style={{
									...iconStyle,
									...facebookColorProps,
									transition: 'transform 0.3s ease-in-out',
									transform: isHoveredFacebook ? 'scale(1.2)' : 'scale(1)',
								}}
							>
								<FaFacebook />
							</animated.div>
						</a>

						<a
							href='#'
							onMouseEnter={() => setIsHoveredTiktok(true)}
							onMouseLeave={() => setIsHoveredTiktok(false)}
						>
							<animated.div
								style={{
									...iconStyle,
									...tiktokIconShadowStyle,
									transition: 'transform 0.3s ease-in-out',
									transform: isHoveredTiktok ? 'scale(1.2)' : 'scale(1)',
								}}
							>
								<TiktokIcon />
							</animated.div>
						</a>
					</div>
				</div>
				<div className='location'>
					<h3>Lokalizacja</h3>

					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.987791322612!2d20.943115315795822!3d52.20726935446037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecbe0a994fb1f%3A0x25c2000b455ea8ed!2sDelikatesy%20Orange!5e0!3m2!1spl!2spl!4v1682706408043!5m2!1spl!2spl'
						width='400'
						height='300'
						
						allowFullScreen=''
						loading='lazy'
						title='Google Map - al. Jerozolimskie, 02-236 Warszawa'
					></iframe>
				</div>
			</div>

			<footer>© {currentYear} BigCloud</footer>
		</>
	);
};
