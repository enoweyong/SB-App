import { useState } from "react";
import "./BrowseBusinesses.css";

export default function BrowseBusinesses({ onNavigate, businesses, searchTerm }) {
  // Check if search term contains only numbers
  const isPhoneSearch = /^\d+$/.test(searchTerm);

  const [filteredBusinesses, setFilteredBusinesses] = useState(
    searchTerm
      ? businesses.filter((b) =>
          isPhoneSearch
            ? b.phone.includes(searchTerm) // Phone-only search if numeric
            : b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
              b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
              b.phone.includes(searchTerm)
        )
      : businesses
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const categories = [
    "All",
    "Retail",
    "Food & Beverage",
    "Services",
    "Healthcare",
    "Technology",
    "Finance",
    "Education",
    "Entertainment",
    "Transportation",
  ];

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    let filtered = businesses;

    if (category !== "All") {
      filtered = filtered.filter((b) => b.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.phone.includes(searchTerm)
      );
    }

    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      filtered.sort((a, b) => b.reviews.length - a.reviews.length);
    } else if (sortBy === "newest") {
      filtered.reverse();
    }

    setFilteredBusinesses(filtered);
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredBusinesses];

    if (value === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (value === "reviews") {
      sorted.sort((a, b) => b.reviews.length - a.reviews.length);
    } else if (value === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredBusinesses(sorted);
  };

  return (
    <div className="browse-container">
      <header className="page-header">
        <button className="btn-back" onClick={() => onNavigate("dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>Browse Businesses</h1>
        <p>Discover local businesses and read reviews</p>
      </header>

      <div className="browse-content">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => handleCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="sort-select"
            >
              <option value="rating">Highest Rating</option>
              <option value="reviews">Most Reviews</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <button
            className="btn-create-new"
            onClick={() => onNavigate("create")}
          >
            ➕ Create Business
          </button>
        </aside>

        {/* Businesses Grid */}
        <main className="businesses-main">
          <div className="results-header">
            <p className="results-count">
              Found {filteredBusinesses.length} business
              {filteredBusinesses.length !== 1 ? "es" : ""}
            </p>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="businesses-grid">
              {filteredBusinesses.map((business) => (
                <div key={business.id} className="business-card">
                  <div className="card-header">
                    <h2>{business.name}</h2>
                    <span className="category-tag">{business.category}</span>
                  </div>

                  <p className="location">📍 {business.location}</p>

                  <p className="description">{business.description}</p>

                  <div className="contact-info">
                    <p>📞 {business.phone}</p>
                    <p>📧 {business.email}</p>
                    {business.website && (
                      <p>
                        🌐{" "}
                        <a href={business.website} target="_blank" rel="noreferrer">
                          Visit Website
                        </a>
                      </p>
                    )}
                  </div>

                  <div className="card-footer">
                    <div className="rating-section">
                      <div className="stars">
                        {"⭐".repeat(Math.floor(business.rating))}
                        {business.rating % 1 !== 0 && "⭐"[0]}
                      </div>
                      <span className="rating-value">
                        {business.rating.toFixed(1)}
                      </span>
                      <span className="reviews-count">
                        ({business.reviews.length} reviews)
                      </span>
                    </div>

                    <button
                      className="btn-view-details"
                      onClick={() =>
                        onNavigate("details", { id: business.id })
                      }
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No businesses found{searchTerm ? ` for "${searchTerm}"` : ". Try adjusting your filters!"}
              </p>
              <p className="no-results-subtext">
                Can't find what you're looking for? Create a new business!
              </p>
              <button
                className="btn-create-new"
                onClick={() => onNavigate("create")}
              >
                ➕ Create a Business
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
