import { useState } from "react";
import "./Dashboard.css";

export default function Dashboard({
  onNavigate,
  userEmail,
  onLogout,
  businesses,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const featuredBusinesses = businesses.slice(0, 3);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🏢 Smooth Business</h1>
            <p>Find and share business experiences</p>
          </div>
          <div className="user-section">
            <span className="user-email">{userEmail}</span>
            <button className="btn-logout" onClick={onLogout}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search by phone number..."
            className={`search-input ${searchFocused ? "focused" : ""}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button
            className="btn-search"
            onClick={() => onNavigate("browse", { search: searchTerm })}
          >
            Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Action Cards */}
        <section className="action-cards">
          <div className="card action-card" onClick={() => onNavigate("create")}>
            <div className="card-icon">➕</div>
            <h3>Create Business</h3>
            <p>Add your business to our platform</p>
          </div>

          <div className="card action-card" onClick={() => onNavigate("browse")}>
            <div className="card-icon">🔍</div>
            <h3>Browse Businesses</h3>
            <p>Discover and review businesses</p>
          </div>

          <div className="card action-card" onClick={() => onNavigate("reviews")}>
            <div className="card-icon">⭐</div>
            <h3>Reviews</h3>
            <p>Read and write reviews</p>
          </div>

          <div className="card action-card" onClick={() => onNavigate("profile")}>
            <div className="card-icon">👤</div>
            <h3>My Profile</h3>
            <p>View your businesses and reviews</p>
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="featured-section">
          <h2>Featured Businesses</h2>
          <div className="featured-grid">
            {featuredBusinesses.length > 0 ? (
              featuredBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="featured-card"
                  onClick={() => onNavigate("details", { id: business.id })}
                >
                  <div className="business-header">
                    <h3>{business.name}</h3>
                    <span className="category-badge">{business.category}</span>
                  </div>
                  <p className="business-description">{business.description}</p>
                  <div className="business-footer">
                    <div className="rating">
                      <span className="stars">
                        {"⭐".repeat(Math.floor(business.rating))}
                      </span>
                      <span className="rating-value">
                        {business.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="reviews-count">
                      ({business.reviews.length} reviews)
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-businesses">No businesses yet. Be the first!</p>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{businesses.length}</div>
            <div className="stat-label">Total Businesses</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {businesses.reduce((sum, b) => sum + b.reviews.length, 0)}
            </div>
            <div className="stat-label">Total Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {(
                businesses.reduce((sum, b) => sum + b.rating, 0) /
                (businesses.length || 1)
              ).toFixed(1)}
            </div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </section>
      </div>
    </div>
  );
}
