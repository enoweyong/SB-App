import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";  
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();
  const handleBrowse = () =>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/browse-businesses");
    }
    else{
      navigate("/signin");
    }
  }
  const handleLearnMore = ()=>{
    navigate("/about");
  };
  return (
    <div className ='hero'>
      <div className='hero-content'>
        <h1>Discover and connect with <span>Trusted Businesses</span></h1>
        <p>Find the best local businesses, read verified reviews, and grow your network with <span>Smooth Business</span></p>
        <div className='hero-buttons'>
          <button className ='primary-btn' onClick={handleBrowse}>Browse Businesses</button>
          <button className ='secondary-btn' onClick={handleLearnMore}>Learn More</button>
        </div>
      </div>
       <section className='features'>
          <h2>Why use Smooth Business?</h2>
          <div className ="feature-grid">
            <div className='feature-card'>
              <h3>Search Businesses</h3>
              <p>Find Trusted Businesses using verified phone numbers.</p>
            </div>
            <div className="feature-card">
              <h3>Add Your Business</h3>
              <p>Grow your business by listening it on our platform</p>
            </div>
          </div>
        </section>
      <div className='hero-image'>
        <div className ='floating-card card1'><FaStar color ='gold'/> 4.9 rating</div>
        <div className ='floating-card card2'><FaStar color ='gold'/> 500+ Business</div>
        <div className ='floating-card card3'><FaStar color ='gold'/>Trusted Reviews</div>
      </div>
    </div>
  );
}

export default Home