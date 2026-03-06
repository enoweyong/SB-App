import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Reviews.css";
import {
  FaStar,
  FaFilter,
  FaArrowLeft,
  FaPlus,
  FaBuilding,
  FaArrowRight,
} from "react-icons/fa";
import "./Reviews.css";

export default function Reviews({ businesses = [] }) {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  const allReviews = useMemo(() => {
    return (businesses || []).flatMap((business) =>
      (business.reviews || []).map((review) => ({
        ...review,
        businessName: business.name,
        businessId: business.id,
        businessCategory: business.category,
      }))
    );
  }, [businesses]);

  const sortedReviews = useMemo(() => {
    return [...allReviews].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [allReviews]);

  const categories = useMemo(() => {
    return ["All", ...new Set((businesses || []).map((b) => b.category))];
  }, [businesses]);

  const filteredReviews = sortedReviews.filter((review) => {
    const categoryMatch =
      selectedCategory === "All" ||
      review.businessCategory === selectedCategory;

    const ratingMatch =
      ratingFilter === "All" ||
      review.rating === Number(ratingFilter);

    return categoryMatch && ratingMatch;
  });

  return (
    <div className="reviews-container">
      <header className="reviews-header">
        <button
          className="btn-back"
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <div>
          <h1>All Reviews</h1>
          <p>See what users are saying about businesses</p>
        </div>
      </header>

      <div className="reviews-layout">
        <aside className="reviews-sidebar">
          <div className="filter-title">
            <FaFilter />
            <h3>Filters</h3>
          </div>

          <div className="filter-section">
            <h4>Category</h4>
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
            <h4>Rating</h4>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="rating-select"
            >
              <option value="All">All Ratings</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn-create-review"
            onClick={() => navigate("/createreview")}
          >
            <FaPlus /> Create Review
          </button>
        </aside>
        <main className="reviews-main">
          <div className="results-header">
            <p>
              {filteredReviews.length} Review
              {filteredReviews.length !== 1 && "s"} Found
            </p>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="empty-state">
              <FaBuilding size={40} />
              <p>No reviews found.</p>
              <button
                className="btn-create-review"
                onClick={() => navigate("/createreview")}
              >
                Create First Review
              </button>
            </div>
           ) : (
            <div className="reviews-grid">
              {filteredReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <div>
                      <h3>{review.businessName}</h3>
                      <span className="category-tag">
                        {review.businessCategory}
                      </span>
                    </div>

                    <div className="rating-box">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                    </div>
                  </div>

                  <h4 className="review-title">
                    {review.title}
                  </h4>

                  <p className="review-comment">
                    {review.comment}
                  </p>

                  <div className="review-footer">
                    <span>By {review.author}</span>
                    <span>{review.date}</span>
                  </div>

                  <button
                    className="btn-view"
                    onClick={() =>
                      navigate(`/business/${review.businessId}`)
                    }>
                    View Business
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}