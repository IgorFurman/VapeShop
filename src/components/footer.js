import React from 'react';
import { Link } from 'react-router-dom';

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

export const Footer = () => {
	const iconStyle = { color: '#ffffff', fontSize: '30px' };
	const iconStyleLogo = { color: '#ffffff', fontSize: '70px' };
	return (
		<>
			<div className='main-footer'>
				<div className='logoinfo'>
					<h2>
						<GiSmokeBomb style={iconStyleLogo} />
						MassiveCloud
					</h2>
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
							<a href='massivecloud@gmail.com'>massivecloud@gmail.com</a>
						</li>
						<li>
							<FaWpforms style={iconStyle} />
							<Link to='/contact'> Wypełnij formularz</Link>
						</li>
					</ul>
				</div>

				<div className='info'>
					<h3>Social Media</h3>
					<div className='sociallogos'>
						<div className='logobox'>
							<a href='#'>
								<FaInstagram style={iconStyle} />
							</a>
							<a href='#'>
								<FaTiktok style={iconStyle} />
							</a>
							<a href='#'>
								<FaFacebook style={iconStyle} />
							</a>
						</div>
					</div>
				</div>
				<div className='location'>
					<h3>Lokalizacja</h3>

					
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.987791322612!2d20.943115315795822!3d52.20726935446037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecbe0a994fb1f%3A0x25c2000b455ea8ed!2sDelikatesy%20Orange!5e0!3m2!1spl!2spl!4v1682706408043!5m2!1spl!2spl'
						width='400'
						height='300'
						style={{ border: 'solid 1px #ccc' }}
						allowfullscreen=''
						loading='lazy'
                        title="Google Map - al. Jerozolimskie, 02-236 Warszawa"
					></iframe>

				</div>
			</div>

			<footer>© Your Copyright 2021 All Rights Reserved</footer>
		</>
	);
};
