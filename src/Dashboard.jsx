import React from 'react';
import "./Dashboard.css"; 
import {FaStore, FaStar, FaChartLine, FaUser, FaPlus, FaSearch, FaSignOutAlt} from 'react-icons/fa';
import {API} from "./api";
import { useNavigate } from 'react-router-dom';

export default function Dashboard () {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className='dashboard'>
      <div className ='search-section'>
      <div className='search-box'>
      <FaSearch className="search-icon"/>
        <input type='text' placeholder='search by phone number...'/>
         </div>
        <button className='primary-btn'>Search</button>
      </div>

      <div className="stats-grid">
      <div className="stat-card">
      <div className="stat-icon blue">
       <FaStore/>
       </div>
       <div>
       <h3>12</h3>
       <p>Total Businesses</p>
       </div>
       </div>
       <div className='stat-card'>
       <div className='stat-icon yellow'> <FaStar/>
       </div>
       <div>
       <h3>87</h3>
       <p>Total Reviews</p></div>
       </div>
       <div className="stat-card">
        <div className="stat-icon purple"> <FaChartLine/></div>
        <div>
        <h3>4.7</h3>
        <p>Average Rating</p>
        </div></div>
      </div>
      <div className="action-grid">
      <div className="action-card"> <FaPlus className ="action-icon"/>
      <h4>Create Business</h4>
      <p>Add your business to the platform</p></div>
      
      <div className="action-card">
      <FaSearch className="action-icon"/>
      <h4>Browse Businesses</h4>
      <p>Discover and review businesses</p></div>
      </div>
      <div className="action-card"><FaStar className="action-icon"/>
      <h4>Reviews</h4>
      <p>Read and write reviews</p></div>

      <div className="action-card"> <FaUser className="action-icon"/>
      <h4>My Profile</h4>
      <p>View your profile and activities</p>
      </div>
      </div>
  );
}