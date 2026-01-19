import { useState } from "react";
import "./BusinessDetails.css";

export default function BusinessDetails({ onNavigate, businesses, businessId, onAddReview }) {
  const business = businesses.find((b) => b.id === businessId);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});

  if (!business) {
    return (
      <div className="error-container">
        <h1>Business not found</h1>
        <button onClick={() => onNavigate("browse")}>Back to Businesses</button>
      </div>
    );
  }

  const validateReview = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Review title is required";
    if (!formData.comment.trim()) newErrors.comment = "Review comment is required";
    if (formData.comment.length < 10)
      newErrors.comment = "Review must be at least 10 characters";
    return newErrors;
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newErrors = validateReview();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const newReview = {
        id: Date.now(),
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        date: new Date().toLocaleDateString(),
        author: "You",
      };

      onAddReview(businessId, newReview);
      setErrors({});
      setFormData({ rating: 5, title: "", comment: "" });
      setShowReviewForm(false);
    }
  };

  const averageRating =
    business.reviews.length > 0
      ? (
          business.reviews.reduce((sum, r) => sum + r.rating, 0) /
          business.reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="details-container">
      <header className="page-header">
        <button className="btn-back" onClick={() => onNavigate("browse")}>
          ← Back to Businesses
        </button>
      </header>

      <div className="details-content">
        {/* Business Header */}
        <section className="business-header">
          <div className="header-info">
            <h1>{business.name}</h1>
            <span className="category-badge">{business.category}</span>
          </div>

          <div className="header-details">
            <div className="detail-item">
              <span className="label">Location:</span>
              <span className="value">📍 {business.location}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone:</span>
              <span className="value">📞 {business.phone}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">📧 {business.email}</span>
            </div>
            {business.website && (
              <div className="detail-item">
                <span className="label">Website:</span>
                <span className="value">
                  🌐{" "}
                  <a href={business.website} target="_blank" rel="noreferrer">
                    {business.website}
                  </a>
                </span>
              </div>
            )}
          </div>
        </section>

        <div className="details-grid">
          {/* Main Content */}
          <main className="details-main">
            {/* Description */}
            <section className="section">
              <h2>About</h2>
              <p className="description">{business.description}</p>
            </section>

            {/* Rating Summary */}
            <section className="section rating-summary">
              <h2>Customer Reviews</h2>
              <div className="rating-overview">
                <div className="rating-large">
                  <div className="stars-large">
                    {"⭐".repeat(Math.floor(averageRating))}
                  </div>
                  <p className="rating-score">{averageRating}</p>
                  <p className="rating-label">
                    Based on {business.reviews.length} review
                    {business.reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="rating-distribution">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = business.reviews.filter(
                      (r) => r.rating === stars
                    ).length;
                    const percentage =
                      business.reviews.length > 0
                        ? (count / business.reviews.length) * 100
                        : 0;
                    return (
                      <div key={stars} className="distribution-row">
                        <span className="stars-label">{stars} ⭐</span>
                        <div className="bar-container">
                          <div
                            className="bar"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="count">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {!showReviewForm && (
                <button
                  className="btn-leave-review"
                  onClick={() => setShowReviewForm(true)}
                >
                  ✍️ Leave a Review
                </button>
              )}
            </section>

            {/* Review Form */}
            {showReviewForm && (
              <section className="section review-form-section">
                <h3>Leave Your Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Good</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Poor</option>
                      <option value="1">1 Star - Terrible</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="title">Review Title</label>
                    <input
                      id="title"
                      type="text"
                      placeholder="Summarize your experience..."
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className={errors.title ? "input-error" : ""}
                    />
                    {errors.title && (
                      <span className="error-text">{errors.title}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="comment">Your Review</label>
                    <textarea
                      id="comment"
                      placeholder="Share your experience..."
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      rows="5"
                      className={errors.comment ? "input-error" : ""}
                    />
                    {errors.comment && (
                      <span className="error-text">{errors.comment}</span>
                    )}
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Post Review
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Reviews List */}
            <section className="section reviews-list">
              <h2>All Reviews</h2>
              {business.reviews.length > 0 ? (
                <div className="reviews">
                  {business.reviews.map((review) => (
                    <div key={review.id} className="review">
                      <div className="review-header">
                        <div>
                          <h4>{review.title}</h4>
                          <span className="stars">
                            {"⭐".repeat(review.rating)}
                          </span>
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <p className="review-author">By {review.author}</p>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-reviews">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </section>
          </main>

          {/* Sidebar */}
          <aside className="details-sidebar">
            <div className="sidebar-card info-card">
              <h3>Quick Info</h3>
              <ul>
                <li>
                  <strong>Reviews:</strong> {business.reviews.length}
                </li>
                <li>
                  <strong>Average Rating:</strong> {averageRating} ⭐
                </li>
                <li>
                  <strong>Created:</strong> {business.createdAt}
                </li>
                <li>
                  <strong>Category:</strong> {business.category}
                </li>
              </ul>
            </div>

            <button className="btn-contact" onClick={() => {}}>
              📧 Contact Business
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
