import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { app } from '../config/firebase-config';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { FaPhoneAlt, FaEnvelopeOpenText, FaInstagram, FaFacebook, FaTiktok, FaWpforms } from 'react-icons/fa';
import { GiSmokeBomb } from 'react-icons/gi';
import { GrMap } from 'react-icons/gr';

import './footer.css';
import LogoFooter from '../assets/icons8-vape-60-white.png';

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

export const Footer = ( ) => {
  const currentYear = new Date().getFullYear();
  const iconStyle = { color: '#ffffff', fontSize: '30px' };
	const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const location = useLocation();
  const pathsToExclude = ['/profile', '/login', '/register', '/contact', '/products'];
const showNewsletter = !pathsToExclude.some(path => location.pathname.startsWith(path));


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

  return (
    <>
      {showNewsletter && (
			<div className="newsletter-footer">
      <h2 className='newsletter-heading'>Zapisz się na nasz newsletter!</h2>
      <p className='newsletter-info'>Otrzymuj najnowsze informacje o naszych promocjach i nowościach.</p>
      {isSubscribed ? (
        <p className='newsletter-success'>Dziękujemy za zapisanie się na newsletter!</p>
      ) : (
        <form className='newsletter-form' onSubmit={handleNewsletterSubmit}>
          <input type="email" placeholder="Twój adres e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Zapisz się</button>
        </form>
      )}
    </div>
      )}

      <div className="main-footer">
        <div className="logoinfo">
          <h2>
            <img src={LogoFooter} alt="BigCloud Logo" />
            BigCloud
          </h2>
          <a target="_blank" href="https://icons8.com/icon/PZ8cqf92g6gy/vape">
            Vape icon by
          </a>{' '}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </div>
        <div className="contact-details">
          <h3>Kontakt</h3>
          <ul>
            <li>
              <FaPhoneAlt style={iconStyle} /> <a href="tel:+919326048690">+91 0987654321</a>
            </li>
            <li>
              <FaEnvelopeOpenText style={iconStyle} />
              <a href="mailto:massivecloud@gmail.com">massivecloud@gmail.com</a>
            </li>
            <li>
              <FaWpforms style={iconStyle} />
              <Link to="/contact" onClick={() => handleScrollAndRedirect('/contact')}>
                Wypełnij formularz
              </Link>
            </li>
          </ul>
        </div>

        <div className="social">
          <h3>Social Media</h3>
          <div className="sociallogos">
            <div className="logobox">
              <a href="#">
                <FaInstagram style={iconStyle} />
              </a>
              <a href="#">
                <FaTiktok style={iconStyle} />
              </a>
              <a href="#">
                <FaFacebook style={iconStyle} />
              </a>
            </div>
          </div>
        </div>
        <div className="location">
          <h3>Lokalizacja</h3>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.987791322612!2d20.943115315795822!3d52.20726935446037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecbe0a994fb1f%3A0x25c2000b455ea8ed!2sDelikatesy%20Orange!5e0!3m2!1spl!2spl!4v1682706408043!5m2!1spl!2spl"
            width="400"
            height="300"
            style={{ border: 'solid 1px #ccc' }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map - al. Jerozolimskie, 02-236 Warszawa"
          ></iframe>
        </div>
      </div>

      <footer>© {currentYear} BigCloud</footer>
    </>
  );
};
