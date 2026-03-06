import React from "react";
import "./About.css";
import { FaStore, FaSearch, FaStar, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About Smooth Business</h1>
        <p>
          Smooth Business is a platform that helps people discover trusted
          local businesses, read genuine reviews, and connect with reliable
          service providers across Cameroon.
        </p>
      </section>

      {/* MISSION */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to build a transparent ecosystem where businesses can
          grow and customers can easily find trustworthy services through real
          user experiences and reviews.
        </p>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>What You Can Do on Smooth Business</h2>

        <div className="features-grid">

          <div className="feature-card">
            <FaSearch className="feature-icon" />
            <h3>Discover Businesses</h3>
            <p>
              Search for businesses easily using phone numbers or categories.
            </p>
          </div>

          <div className="feature-card">
            <FaStore className="feature-icon" />
            <h3>Create Your Business</h3>
            <p>
              Register and showcase your business so customers can find you.
            </p>
          </div>

          <div className="feature-card">
            <FaStar className="feature-icon" />
            <h3>Reviews & Ratings</h3>
            <p>
              Read real customer reviews and rate businesses based on your
              experience.
            </p>
          </div>

          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Community Trust</h3>
            <p>
              Build a trusted network where users and businesses support each
              other.
            </p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="about-section">
        <h2>Why Choose Smooth Business?</h2>
        <ul className="why-list">
          <li>✔ Find trusted businesses quickly</li>
          <li>✔ Verified user reviews</li>
          <li>✔ Easy business registration</li>
          <li>✔ Designed for local communities</li>
        </ul>
      </section>

      {/* CALL TO ACTION */}
      <section className="about-cta">
        <h2>Join the Smooth Business Community</h2>
        <p>
          Whether you're a business owner or a customer looking for reliable
          services, Smooth Business helps you connect.
        </p>
        <button className="cta-btn">Get Started</button>
      </section>

    </div>
  );
}