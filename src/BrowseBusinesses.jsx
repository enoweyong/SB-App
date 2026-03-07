import React from 'react'
import { useState } from "react";
import "./BrowseBusinesses.css";
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

 const businesses = [
    { 
      id: 1, name: "Tech Solutions", category: "Technology", rating: 4.8
    },
     { 
      id: 2, name: "Elite Fashion", category: "Fashion", rating: 4.5
    },
     { 
      id: 3, name: "Fresh Bites", category: "Food", rating: 4.7
    },
     { 
      id: 4, name: "Smart Repairs", category: "Services", rating: 4.3
    },
     { 
      id: 5, name: "Digital Experts", category: "Technology", rating: 4.9
    },
    ]

const BrowseBusinesses = () => {
 const [search, setSearch] = useState("");
 const [category, setCategory] = useState("All");

 const filtered = businesses.filter((biz) => {
   return(
    biz.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || biz.category === category)
   )
 }
   );

   const navigate = useNavigate();
  return (
    <div className ='browse-container'>
      <h2>Browse Businesses</h2>
      <div className = 'filter-bar'>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Fashion">Fashion</option>
          <option value="Food">Food</option>
          <option value="Services">Services</option>
        </select>
      </div>
      <div className ='business-grid'>{filtered.map((biz) => (<div className ='business-card' key ={biz.id}>
        <div className ="card-header">
          <div className = "avatar"> {biz.name[0]}</div>
          <div>
            <h3>{biz.name}</h3>
            <p>{biz.category}</p>
          </div>
        </div>
        <div className ="rating"><FaStar color ='gold'/> {biz.rating}</div>
        <button className ='view-btn'
           onClick = {()=>navigate(`/business/${biz.id}`)}>View Details</button>
      </div>))}
      </div>
    </div>
  );
}

export default BrowseBusinesses