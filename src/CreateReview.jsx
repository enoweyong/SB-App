import { useState } from "react";
import "./CreateReview.css";

export default function CreateReview({ onNavigate, businesses, onAddReview }) {
  const [formData, setFormData] = useState({
    businessId: businesses.length > 0 ? businesses[0].id : "",
    rating: 5,
    title: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessId) newErrors.businessId = "Please select a business";
    if (!formData.title.trim()) newErrors.title = "Review title is required";
    if (!formData.comment.trim()) newErrors.comment = "Review comment is required";
    if (formData.comment.length < 10)
      newErrors.comment = "Review must be at least 10 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" || name === "businessId" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      
      // Create new review object
      const newReview = {
        id: Date.now(),
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        date: new Date().toLocaleDateString(),
        author: "You",
      };

      // Add review to business
      onAddReview(formData.businessId, newReview);

      setSuccessMessage("Review submitted successfully!");
      
      // Reset form
      setFormData({
        businessId: businesses.length > 0 ? businesses[0].id : "",
        rating: 5,
        title: "",
        comment: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        onNavigate("reviews");
      }, 2000);
    }
  };

  return (
    <div className="createreview-container">
      <div className="createreview-wrapper">
        <button className="back-button" onClick={() => onNavigate("reviews")}>
          ← Back to Reviews
        </button>

        <div className="createreview-box">
          <form onSubmit={handleSubmit} className="createreview-form">
            <div className="form-header">
              <h1>Create a Review</h1>
              <p>Share your experience with the community</p>
              <div className="divider"></div>
            </div>

            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {/* Business Selection */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="businessId">Select Business *</label>
                <select
                  id="businessId"
                  name="businessId"
                  value={formData.businessId}
                  onChange={handleChange}
                  className={errors.businessId ? "input-error" : ""}
                >
                  <option value="">-- Choose a business --</option>
                  {businesses.map((business) => (
                    <option key={business.id} value={business.id}>
                      {business.name} - {business.category}
                    </option>
                  ))}
                </select>
                {errors.businessId && (
                  <span className="error-text">{errors.businessId}</span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rating">Rating *</label>
                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${
                        formData.rating === star ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, rating: star })
                      }
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="rating-value">{formData.rating}/5</span>
                </div>
              </div>
            </div>

            {/* Review Title */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Review Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Summarize your experience (e.g., 'Great service!')"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? "input-error" : ""}
                />
                {errors.title && (
                  <span className="error-text">{errors.title}</span>
                )}
              </div>
            </div>

            {/* Review Comment */}
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="comment">Your Review *</label>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Share your experience... (minimum 10 characters)"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="6"
                  className={errors.comment ? "input-error" : ""}
                />
                {errors.comment && (
                  <span className="error-text">{errors.comment}</span>
                )}
                <p className="char-count">
                  {formData.comment.length} / 10+ characters
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Review
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => onNavigate("reviews")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
