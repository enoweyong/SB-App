import React from 'react'
import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from 'react-router-dom';    
import "./Navbar.css"; 

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();

  };
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
        <div className ='nav-links'>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/about'><li>About</li></NavLink>
            <NavLink to='/browse-businesses'><li>Browse Businesses</li></NavLink>    
            <NavLink to='/reviews'><li>Reviews</li></NavLink>
            </div>
        <div className ='auth-buttons'>
            <NavLink to='/signin' className ='signin'><li>Sign In</li></NavLink>
            <NavLink to='/signup'><li>Sign Up</li></NavLink>
        </div>
        <p onClick = {handleLogout} className ='logout'>Logout</p>
    </div>
    </nav>
  );
}

export default Navbar