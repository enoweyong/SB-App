import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import {
  FaStore,
  FaStar,
  FaChartLine,
  FaUser,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { API } from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);
  const [businesses, setBusinesses] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch all businesses
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await API.get("/businesses");
        setBusinesses(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBusinesses();
  }, []);

  // Search business by Cameroon phone number
  const handleSearch = async () => {
    if (!/^(?:\+237)?6[0-9]{8}$/.test(phone)) {
     alert("Enter a valid Cameroon phone number (6XXXXXXXX)");
     return;
    }

    try {
      const res = await API.get(`/businesses/search/${phone}`);
      setResult(res.data);
    } catch (err) {
      alert("Business not found");
      setResult(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div className="logo-area">
          <FaStore className="logo-icon" />
          <h2>Smooth Business</h2>
        </div>

        <div className="header-right">
          <div className="user-badge">
            <FaUser />
            <span>{user?.fullName}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="search-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by Cameroon phone number (6XXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* SEARCH RESULT */}
      {result && (
        <div className="stat-card" style={{ marginTop: "20px" }}>
          <div>
            <h3>{result.name}</h3>
            <p>Phone: {result.phone}</p>
            <p>Location: {result.location}</p>
          </div>
        </div>
      )}

      {/* BUSINESS LIST */}
      <div className="business-list">
        {businesses.map((b) => (
          <div key={b._id} className="business-card">
            <h3>{b.name}</h3>
            <p>{b.category}</p>
            <p>{b.phone}</p>
            <p>{b.location}</p>
          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaStore />
          </div>
          <div>
            <h3>{businesses.length}</h3>
            <p>Total Businesses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">
            <FaStar />
          </div>
          <div>
            <h3>87</h3>
            <p>Total Reviews</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <FaChartLine />
          </div>
          <div>
            <h3>4.7</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="action-grid">

        <Link to="/create-business" className="action-card">
          <FaPlus className="action-icon" />
          <h4>Create Business</h4>
          <p>Add your business to the platform</p>
        </Link>

        <Link to="/browse-businesses" className="action-card">
          <FaSearch className="action-icon" />
          <h4>Browse Businesses</h4>
          <p>Discover and review businesses</p>
        </Link>

        <Link to="/reviews" className="action-card">
          <FaStar className="action-icon" />
          <h4>Reviews</h4>
          <p>Read and write reviews</p>
        </Link>

        <Link to="/profile" className="action-card">
          <FaUser className="action-icon" />
          <h4>My Profile</h4>
          <p>View your profile and activities</p>
        </Link>

      </div>

    </div>
  );
}