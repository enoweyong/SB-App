import React from 'react'
import { FaStar } from 'react-icons/fa';
import "./Navbar.css";  
import "./Home.css"; 

const Home = () => {
  return (
    <div className ='hero'>
      <div className='hero-content'>
        <h1>Discover and connect with <span>Trusted Businesses</span></h1>
        <p>Find the best local businesses, read verified reviews, and grow your network with <span>Smooth Business</span></p>
        <div className='hero-buttons'>
          <button className ='primary-btn'>Browse Businesses</button>
          <button className ='secondary-btn'>Learn More</button>
        </div>
      </div>
      <div className='hero-image'>
        <div className ='floating-card card1'><FaStar color ='gold'/> 4.9 rating</div>
        <div className ='floating-card card2'><FaStar color ='gold'/> 500+ Business</div>
        <div className ='floating-card card3'><FaStar color ='gold'/>Trusted Reviews</div>
      </div>
    </div>
  );
}

export default Home