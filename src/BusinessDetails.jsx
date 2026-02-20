import React from 'react'
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import "./BusinessDetails.css"; 
const sampleBusinesses =[
  { id: 1, name: "Tech Solutions", category: "Technology", rating: 4.8, description: "Your go-to for all tech needs. We provide top-notch IT services and solutions to help your business thrive in the digital age." },
  { id: 2, name: "Elite Fashion", category: "Fashion", rating: 4.5, description: "Discover the latest trends and timeless styles at Elite Fashion. We offer a curated selection of clothing and accessories for every occasion." },
  { id: 3, name: "Fresh Bites", category: "Food", rating: 4.7, description: "Savor the flavors of Fresh Bites, where we serve delicious and healthy meals made from locally sourced ingredients. Perfect for a quick lunch or a cozy dinner." },
  { id: 4, name: "Smart Repairs", category: "Services", rating: 4.3, description: "Need a fix? Smart Repairs has you covered with expert repair services for electronics, appliances, and more. Fast, reliable, and affordable solutions." },
  { id: 5, name: "Digital Experts", category: "Technology", rating: 4.9, description: "Leading the way in digital innovation, Digital Experts offers cutting-edge solutions to help your business succeed online. From web development to digital marketing, we do it all." },
]

export const BusinessDetails = () => {
  const { id } = useParams();
  const business = sampleBusinesses.find(b => b.id === parseInt(id));
  if (!business) {
    return <div>Business not found</div>;
  }
  const [reviews, setReviews] = useState([
    {name: "Eyong", comment: "Great service!"},
    {name: "Serah", comment: "Highly recommend!"},
  ]);
  const [newReview, setNewReview] = useState("");
  const handleAddReview = () => {
    if (newReview.trim() === "") return; 
    setReviews([...reviews, {name: "Anonymous", comment: newReview}]);
    setNewReview("");
    };
    if (!business) return <h2 style ={{padding: '120px 8%'}}>Business not found</h2>
  return (
    <div className='details-container'>
      <div className='business-info'>
        <h2>{business.name}</h2>
        <p className='description'>{business.description}</p>
        <div className='rating'><FaStar color='gold'/>{business.rating}</div>
      </div>
      <div className='reviews-section'>
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className='review-card'>
          <strong>{review.name}</strong>
           <p>{review.comment}</p>
        </div>
      ))}

      <div className='add-review'>
        <textarea placeholder='Write a review...' value={newReview} onChange={(e) => setNewReview(e.target.value)}/>
        <button onClick={handleAddReview}>Submit Reviews</button>
      </div>
    </div>
    </div>
  );
}
