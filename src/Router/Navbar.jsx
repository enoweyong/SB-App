import React from 'react'
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';    
import "./Navbar.css"; 

const Navbar = () => {
    const navigate = useNavigate();
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  }
  window.addEventListener('scroll', handleScroll);
  return () => 
    window.removeEventListener('scroll', handleScroll);
  },[])

    
  return (
    
    <nav className ={`navbar ${scrolled ? 'scrolled' : ''}`}>
    <div className = 'nav-container'>
      <div className='logo'>
        <span className='logo-icon'>SB</span>
        <span className='logo-text'>Smooth Business</span>
      </div>
        <diV className ='nav-links'>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/About'><li>About</li></NavLink>
            <NavLink to='/BrowseBusinesses'><li>Browse Businesses</li></NavLink>    
            <NavLink to='/Reviews'><li>Reviews</li></NavLink>
            </diV>
        <div className ='auth-buttons'>
            <NavLink to='/Signin' className ='signin'><li>Sign In</li></NavLink>
            <NavLink to='/Signup'><li>Sign Up</li></NavLink>
        </div>
    </div>
    </nav>
  );
}

export default Navbar