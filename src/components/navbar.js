import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart,  User } from 'phosphor-react';
import './navbar.css';
import { ProductSearch, } from './search';
import { useSpring, animated } from 'react-spring';


import { FaSearch } from 'react-icons/fa';
import LogoNav from '../assets/icons8-vape-60-white.png';

export const Navbar = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
	const IconStyle = { color: 'white', fontSize: '32px', cursor: 'pointer' };

	const searchAnimation = useSpring({
		opacity: isSearchOpen ? 1 : 0,
		transform: isSearchOpen ? 'translateY(0)' : 'translateY(-20px)',
	});

	return (
		<nav className='navbar'>
			<div className='navbar-left'>
				<Link to='/' className='name'>
					<img src={LogoNav}></img>BigCloud
				</Link>
				<div className='search-mobile'>
					{!isSearchOpen && <FaSearch style={IconStyle} onClick={toggleSearch} />}
					{isSearchOpen && (
						<animated.div style={searchAnimation}>
							<ProductSearch setIsSearchOpen={setIsSearchOpen} />
						</animated.div>
					)}
				</div>
			</div>
			<div className='navbar-right'>
				<div className='search-desktop'>
					{!isSearchOpen && <FaSearch style={IconStyle} onClick={toggleSearch} />}
					{isSearchOpen && (
						<animated.div style={searchAnimation}>
							<ProductSearch setIsSearchOpen={setIsSearchOpen} />
						</animated.div>
					)}
				</div>
				<div className='links'>
				
					<Link className='link' to='/cart'>
						{' '}
						<ShoppingCart size={32} />{' '}
					</Link>
					<Link className='link' to='/login'> <User size={32} /></Link>
				</div>
			</div>
		</nav>
	);
};

