import { useState } from "react";
import "./Reviews.css";

export default function Reviews({ onNavigate, businesses }) {
  // Collect all reviews from all businesses
  const allReviews = businesses.flatMap((business) =>
    business.reviews.map((review) => ({
      ...review,
      businessName: business.name,
      businessId: business.id,
      businessCategory: business.category,
    }))
  );

  // Sort reviews by date (newest first)
  const sortedReviews = [...allReviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  // Get unique categories from businesses
  const categories = ["All", ...new Set(businesses.map((b) => b.category))];

  // Filter reviews based on category and rating
  const filteredReviews = sortedReviews.filter((review) => {
    const categoryMatch =
      selectedCategory === "All" || review.businessCategory === selectedCategory;
    const ratingMatch =
      ratingFilter === "All" || review.rating === parseInt(ratingFilter);
    return categoryMatch && ratingMatch;
  });

  return (
    <div className="reviews-container">
      {/* Header */}
      <header className="reviews-header">
        <button className="btn-back" onClick={() => onNavigate("dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>All Reviews</h1>
        <p>See what users are saying about businesses</p>
      </header>

      <div className="reviews-content">
        {/* Sidebar Filters */}
        <aside className="reviews-filters">
          <div className="filter-section">
            <h3>Filter by Category</h3>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Filter by Rating</h3>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="rating-select"
            >
              <option value="All">All Ratings</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
              <option value="4">⭐⭐⭐⭐ 4 Stars</option>
              <option value="3">⭐⭐⭐ 3 Stars</option>
              <option value="2">⭐⭐ 2 Stars</option>
              <option value="1">⭐ 1 Star</option>
            </select>
          </div>

          <button
            className="btn-create-review"
            onClick={() => onNavigate("createreview")}
          >
            ✏️ Create Review
          </button>
        </aside>

        {/* Reviews List */}
        <main className="reviews-main">
          <div className="results-header">
            <p className="results-count">
              Found {filteredReviews.length} review
              {filteredReviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredReviews.length > 0 ? (
            <div className="reviews-list">
              {filteredReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-info">
                      <h3>{review.businessName}</h3>
                      <p className="review-category">{review.businessCategory}</p>
                    </div>
                    <div className="review-rating">
                      <span className="stars">
                        {"⭐".repeat(review.rating)}
                      </span>
                      <span className="rating-number">{review.rating}/5</span>
                    </div>
                  </div>

                  <div className="review-title">{review.title}</div>

                  <p className="review-comment">{review.comment}</p>

                  <div className="review-footer">
                    <span className="review-author">By {review.author}</span>
                    <span className="review-date">{review.date}</span>
                  </div>

                  <button
                    className="btn-view-business"
                    onClick={() =>
                      onNavigate("details", { id: review.businessId })
                    }
                  >
                    View Business →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reviews">
              <p>No reviews found with selected filters.</p>
              <button
                className="btn-create-review"
                onClick={() => onNavigate("createreview")}
              >
                ✏️ Be the first to create a review
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
