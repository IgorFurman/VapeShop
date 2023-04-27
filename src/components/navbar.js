import React from "react";
import {Link} from "react-router-dom";
import { ShoppingCart} from "phosphor-react"
import './navbar.css'

export const Navbar = () => {
    return <nav className="navbar">
        <div className="links">
            <Link to='/'> Sklep</Link>
            <Link to='/cart'> <ShoppingCart size={32}/> </Link>
            
        </div>
    </nav>
}