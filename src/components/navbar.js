import React from "react";
import {Link} from "react-router-dom";
import { ShoppingCart} from "phosphor-react"
import './navbar.css'

import LogoNav from '../assets/icons8-vape-60-white.png'

export const Navbar = () => {
    return <nav className="navbar">
        <Link to='/' className="name"><img src={LogoNav}></img>BigCloud</Link>
						
        <div className="links">
            <Link to='/'> Sklep</Link>
            <Link to='/cart'> <ShoppingCart size={32}/> </Link>
            
        </div>
    </nav>
}