import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fallDown as Menu } from 'react-burger-menu';
import { ShoppingCart, User } from 'phosphor-react';
import './navbar.css';
import { ProductSearch } from './search';
import { useSpring, animated } from 'react-spring';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase-config';

import { FaSearch, FaBars, FaHome, FaTimes } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import LogoNav from '../assets/icons8-vape-60-white.png';

import { ShopContext } from '../context/shop-context';
import { NavbarProvider, NavbarContext } from '../context/navbar-context.js'; 


export const Navbar = () => {
	const { cartItemCount } = useContext(ShopContext);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	const toggleSearch = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setIsSearchOpen(!isSearchOpen);
		if (isOpen) setIsOpen(false);
	};

	const toggleScrollLock = (isLocked) => {
		document.body.style.overflow = isLocked ? 'hidden' : 'auto';
	};

	const toggleMenu = () => {
		setIsOpen((prevIsOpen) => {
			const newIsOpen = !prevIsOpen;
			toggleScrollLock(newIsOpen);
			return newIsOpen;
		});
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
		toggleScrollLock(false);
	};

	useEffect(() => {
		toggleScrollLock(isOpen);
	}, [isOpen]);

	// styles

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


	// fix loading problem
	const { navbarVisible, isLoading } = useContext(NavbarContext);

  if (isLoading) {
    return null; 
  }


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
					<div className='navbar-icons-container-all'>
						<div className='search-desktop'>
							{!isSearchOpen && (
								<div className='navbar-icons-container-individual'>
									<IoSearchOutline
										style={IconStyle}
										onClick={toggleSearch}
										aria-label='Szukaj'
										title='Szukaj'
									/>
									<span className='icon-label'>Szukaj</span>
								</div>
							)}
							{isSearchOpen && (
								<animated.div style={searchAnimation}>
									<ProductSearch setIsSearchOpen={setIsSearchOpen} />
								</animated.div>
							)}
						</div>
						<div className='links'>
							<Link className='link desktop-only' to='/cart'>
								<div className='navbar-icons-container-individual'>
									<ShoppingCart
										style={IconStyle}
										aria-label='Koszyk'
										title='Koszyk'
									/>

									<span className='icon-label'>Koszyk</span>
									{cartItemCount > 0 && (
										<span className='navbar-item-count-card'>
											{cartItemCount}
										</span>
									)}
								</div>
							</Link>
							<Link
								className='link desktop-only'
								to={user ? `/profile/${user.uid}` : '/login'}
							>
								<div className='navbar-icons-container-individual'>
									<User
										style={IconStyle}
										aria-label={user ? 'Panel użytkownika' : 'Zaloguj się'}
										title={user ? 'Panel użytkownika' : 'Zaloguj się'}
									/>
									<span className='icon-label'>{user ? 'Moje konto' : 'Zaloguj się'}</span>
								</div>
							</Link>
						</div>
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
							<a
								style={{ position: 'relative' }}
								onClick={(e) => handleLinkClick(e, '/cart')}
							>
								<ShoppingCart style={burgerMenuIconStyle} />
								{cartItemCount > 0 && (
									<span className='burger-item-count-card'>
										{cartItemCount}
									</span>
								)}{' '}
								Koszyk
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
				</div>
			</nav>
		</>
	);
};
