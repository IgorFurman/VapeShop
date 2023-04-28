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
    const iconStyle = { color: '#ffffff', fontSize: '30px' }
	return (
		<>
			
				<div className='main-footer'>
					<div className='logoinfo' data-aos='fade-up'>
						<h2>
							<GiSmokeBomb style={iconStyle}/>
							MassiveCloud
						</h2>

						<div className='contact-details'>
							<h3>Skontakuj się z nami</h3>
							<li>
								<FaPhoneAlt style={iconStyle}/> <a href='tel:+919326048690'>+91 0987654321</a>
							</li>
							<li>
								<FaEnvelopeOpenText style={iconStyle}/>
								<a href='massivecloud@gmail.com'>massivecloud@gmail.com</a>
							</li>
							<li>
								<FaWpforms style={iconStyle}/>
								<Link to='/contact'> Wypełnij formularz</Link>
							</li>
						</div>
					</div>
					<div className='info' data-aos='fade-up'>
						<h3>Social Media</h3>
						<div className='sociallogos'>
							<div className='logobox'>
								<a href='#'>
									<FaInstagram style={iconStyle}/>
								</a>
								<a href='#'>
									<FaTiktok style={iconStyle}/>
								</a>
								<a href='#'>
									<FaFacebook style={iconStyle}/>
								</a>
							</div>
						</div>
					</div>
					<div className='com' data-aos='fade-up'>
						<h3>Lokalizacja</h3>
						<ul>
							<li>
                            <a href='#'><GrMap style={iconStyle}/><br/>
				Aleja Zwycięzców 20<br />(wejście od strony ulicy)<br/>00-111 Warszawa
			</a>
								
							</li>
						</ul>
					</div>
				</div>
				<footer>© Your Copyright 2021 All Rights Reserved</footer>

		</>
	);
};
