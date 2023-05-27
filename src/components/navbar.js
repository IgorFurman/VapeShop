import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fallDown as Menu } from 'react-burger-menu';
import { ShoppingCart, User } from 'phosphor-react';
import './navbar.css';
import { ProductSearch } from './search';
import { useSpring, animated } from 'react-spring';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase-config';

import { FaSearch, FaBars, FaHome, FaTimes } from 'react-icons/fa';
import LogoNav from '../assets/icons8-vape-60-white.png';

export const Navbar = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isScrollLocked, setIsScrollLocked] = useState(false);

	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	const toggleSearch = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setIsSearchOpen(!isSearchOpen);
		if (isOpen) setIsOpen(false);
	};

	const toggleMenu = () => {
		if (!isOpen) {
			setIsOpen(true);
			toggleScrollLock();
		} else {
			setIsOpen(false);
			toggleScrollLock();
		}
	};

	const toggleScrollLock = () => {
		setIsScrollLocked(!isScrollLocked);
		document.body.style.overflow = isScrollLocked ? 'auto' : 'hidden';
	};

	const handleLinkClick = (e, path) => {
		navigate(path);
		setIsOpen(false);
	};

	const handleLogoClick = (e) => {
		e.preventDefault();
		navigate('/');
	};

	const closeMenu = () => {
		setIsOpen(false);
		toggleScrollLock();
	};

	const stylesBurgerMenu = {
		bmMenu: {
			position: 'fixed',
			top: 0,
			right: 0,
			height: '100%',
			width: '250px',
			transition: 'top 0.5s',
			overflowY: 'hidden',
			padding: '30px 19px',
			fontSize: '1.15rem',
			color: 'var(--color-background)',
			background: 'rgba(0, 0, 0, 0.8)',
		},
		bmItem: {
			marginBottom: '15px',
		},
	};
	const IconStyle = { color: 'white', fontSize: '32px', cursor: 'pointer' };

	const burgerMenuIconStyle = {
		color: 'var( --color-background)',
		marginTop: '10px',
		fontSize: '32px',
		cursor: 'pointer',
	};

	const closeMenuIconStyle = {
		position: 'absolute',
		top: '10px',
		right: '10px',
		padding: '5px',

		fontSize: '32px',
		border: '1px solid var(--color-background)',
		borderRadius: '50%',
		cursor: 'pointer',
	};

	const searchAnimation = useSpring({
		opacity: isSearchOpen ? 1 : 0,
		transform: isSearchOpen ? 'translateY(0)' : 'translateY(-20px)',
	});
	return (
		<>
			{isOpen && (
				<div className='overlay' onClick={() => setIsOpen(false)}></div>
			)}
			<nav className='navbar'>
				<div className='navbar-left'>
					<Link to='/' className='name' onClick={handleLogoClick}>
						<img src={LogoNav} alt='logo' />
						BigCloud
					</Link>
					{!isOpen && (
						<div className='search-mobile'>
							{!isSearchOpen && (
								<FaSearch style={IconStyle} onClick={toggleSearch} />
							)}
							{isSearchOpen && (
								<animated.div style={searchAnimation}>
									<ProductSearch setIsSearchOpen={setIsSearchOpen} />
								</animated.div>
							)}
						</div>
					)}
				</div>
				<div className='navbar-right'>
					<div className='search-desktop'>
						{!isSearchOpen && (
							<FaSearch style={IconStyle} onClick={toggleSearch} />
						)}
						{isSearchOpen && (
							<animated.div style={searchAnimation}>
								<ProductSearch setIsSearchOpen={setIsSearchOpen} />
							</animated.div>
						)}
					</div>

					<div className='burger-menu'>
						{!isOpen && <FaBars style={IconStyle} onClick={toggleMenu} />}
						<Menu
							right
							isOpen={isOpen}
							onStateChange={({ isOpen }) => setIsOpen(isOpen)}
							onClose={closeMenu}
							styles={stylesBurgerMenu}
						>
							<FaTimes style={closeMenuIconStyle} onClick={closeMenu} />
							<a onClick={(e) => handleLinkClick(e, '/')}>
								<FaHome style={burgerMenuIconStyle} /> Strona główna
							</a>
							<a onClick={(e) => handleLinkClick(e, '/cart')}>
								<ShoppingCart style={burgerMenuIconStyle} /> Koszyk
							</a>
							<a
								onClick={(e) =>
									handleLinkClick(e, user ? `/profile/${user.uid}` : '/login')
								}
							>
								<User style={burgerMenuIconStyle} /> Panel użytkownika
							</a>
						</Menu>
					</div>
					<div className='links'>
						<Link className='link desktop-only' to='/cart'>
							<ShoppingCart size={32} />
						</Link>
						<Link
							className='link desktop-only'
							to={user ? `/profile/${user.uid}` : '/login'}
						>
							<User size={32} />
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
};
