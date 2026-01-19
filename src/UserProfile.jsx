import { useState } from "react";
import "./UserProfile.css";

export default function UserProfile({ 
  onNavigate, 
  businesses, 
  userEmail,
  userProfilePicture,
  onUpdateProfilePicture,
  onDeleteProfilePicture,
  onDeleteBusiness,
  onDeleteReview,
  onEditBusiness,
  onEditReview
}) {
  const [activeTab, setActiveTab] = useState("businesses");
  const [editingBusinessId, setEditingBusinessId] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editBusinessData, setEditBusinessData] = useState({});
  const [editReviewData, setEditReviewData] = useState({});
  const [editingProfilePicture, setEditingProfilePicture] = useState(false);

  // Get user's businesses (in real app, would filter by user ID)
  const userBusinesses = businesses;

  // Get user's reviews (in real app, would filter by user ID)
  const userReviews = businesses.flatMap((b) =>
    b.reviews.map((r) => ({ ...r, businessName: b.name, businessId: b.id }))
  );

  const totalReviews = userReviews.length;
  const averageRating =
    userReviews.length > 0
      ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1)
      : 0;

  const startEditBusiness = (business) => {
    setEditingBusinessId(business.id);
    setEditBusinessData(business);
  };

  const saveEditBusiness = (businessId) => {
    onEditBusiness(businessId, editBusinessData);
    setEditingBusinessId(null);
  };

  const startEditReview = (review, businessId) => {
    setEditingReviewId(review.id);
    setEditReviewData({ ...review, businessId });
  };

  const saveEditReview = (businessId, reviewId) => {
    onEditReview(businessId, reviewId, editReviewData);
    setEditingReviewId(null);
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfilePicture(reader.result);
        setEditingProfilePicture(false);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="profile-container">
      <header className="page-header">
        <button className="btn-back" onClick={() => onNavigate("dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>My Profile</h1>
      </header>

      <div className="profile-content">
        {/* Profile Card */}
        <section className="profile-card">
          <div className="profile-avatar-section">
            {editingProfilePicture ? (
              <div className="profile-picture-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  id="profile-picture-input"
                  style={{ display: "none" }}
                />
                <label htmlFor="profile-picture-input" className="upload-label">
                  Click to select image
                </label>
                <button
                  className="btn-cancel-upload"
                  onClick={() => setEditingProfilePicture(false)}
                >
                  Cancel
                </button>
              </div>
            ) : userProfilePicture ? (
              <div className="profile-avatar-container">
                <img
                  src={userProfilePicture}
                  alt="Profile"
                  className="profile-avatar-image"
                />
                <div className="picture-actions">
                  <button
                    className="btn-edit-picture"
                    onClick={() => setEditingProfilePicture(true)}
                    title="Edit picture"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-delete-picture"
                    onClick={onDeleteProfilePicture}
                    title="Delete picture"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-avatar-placeholder">
                <div className="avatar-icon">👤</div>
                <button
                  className="btn-add-picture"
                  onClick={() => setEditingProfilePicture(true)}
                >
                  ➕ Add Picture
                </button>
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2>User Profile</h2>
            <p className="email">{userEmail}</p>
          </div>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{businesses.length}</span>
              <span className="stat-label">Businesses Created</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalReviews}</span>
              <span className="stat-label">Reviews Written</span>
            </div>
            <div className="stat">
              <span className="stat-value">{averageRating}</span>
              <span className="stat-label">Avg Review Rating</span>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "businesses" ? "active" : ""}`}
              onClick={() => setActiveTab("businesses")}
            >
              My Businesses ({userBusinesses.length})
            </button>
            <button
              className={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              My Reviews ({totalReviews})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* My Businesses Tab */}
          {activeTab === "businesses" && (
            <section className="businesses-section">
              <div className="section-header">
                <h2>My Businesses</h2>
                <button
                  className="btn-create-new"
                  onClick={() => onNavigate("create")}
                >
                  ➕ Create New Business
                </button>
              </div>

              {userBusinesses.length > 0 ? (
                <div className="businesses-list">
                  {userBusinesses.map((business) => (
                    <div key={business.id} className="business-item">
                      {editingBusinessId === business.id ? (
                        // Edit Mode
                        <div className="edit-form">
                          <h3>Edit Business</h3>
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              value={editBusinessData.name || ""}
                              onChange={(e) =>
                                setEditBusinessData({
                                  ...editBusinessData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              value={editBusinessData.description || ""}
                              onChange={(e) =>
                                setEditBusinessData({
                                  ...editBusinessData,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Location</label>
                            <input
                              type="text"
                              value={editBusinessData.location || ""}
                              onChange={(e) =>
                                setEditBusinessData({
                                  ...editBusinessData,
                                  location: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="text"
                              value={editBusinessData.phone || ""}
                              onChange={(e) =>
                                setEditBusinessData({
                                  ...editBusinessData,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="edit-actions">
                            <button
                              className="btn-save"
                              onClick={() => saveEditBusiness(business.id)}
                            >
                              Save Changes
                            </button>
                            <button
                              className="btn-cancel"
                              onClick={() => setEditingBusinessId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <>
                          <div className="business-item-header">
                            <h3>{business.name}</h3>
                            <span className="category">{business.category}</span>
                          </div>

                          <p className="location">📍 {business.location}</p>
                          <p className="description">{business.description}</p>

                          <div className="business-stats">
                            <div className="stat">
                              <span className="label">Rating:</span>
                              <span className="value">
                                {business.rating.toFixed(1)} ⭐
                              </span>
                            </div>
                            <div className="stat">
                              <span className="label">Reviews:</span>
                              <span className="value">{business.reviews.length}</span>
                            </div>
                            <div className="stat">
                              <span className="label">Created:</span>
                              <span className="value">{business.createdAt}</span>
                            </div>
                          </div>

                          <div className="business-actions">
                            <button
                              className="btn-view"
                              onClick={() =>
                                onNavigate("details", { id: business.id })
                              }
                            >
                              View Business
                            </button>
                            <button
                              className="btn-edit"
                              onClick={() => startEditBusiness(business)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => onDeleteBusiness(business.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't created any businesses yet.</p>
                  <button
                    className="btn-create-primary"
                    onClick={() => onNavigate("create")}
                  >
                    ➕ Create Your First Business
                  </button>
                </div>
              )}
            </section>
          )}

          {/* My Reviews Tab */}
          {activeTab === "reviews" && (
            <section className="reviews-section">
              <div className="section-header">
                <h2>My Reviews</h2>
              </div>

              {userReviews.length > 0 ? (
                <div className="reviews-list">
                  {userReviews.map((review) => (
                    <div key={review.id} className="review-item">
                      {editingReviewId === review.id ? (
                        // Edit Mode
                        <div className="edit-form">
                          <h3>Edit Review</h3>
                          <div className="form-group">
                            <label>Rating</label>
                            <div className="rating-selector">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  className={`star-btn ${
                                    editReviewData.rating === star ? "active" : ""
                                  }`}
                                  onClick={() =>
                                    setEditReviewData({
                                      ...editReviewData,
                                      rating: star,
                                    })
                                  }
                                >
                                  ⭐
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Title</label>
                            <input
                              type="text"
                              value={editReviewData.title || ""}
                              onChange={(e) =>
                                setEditReviewData({
                                  ...editReviewData,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Comment</label>
                            <textarea
                              value={editReviewData.comment || ""}
                              onChange={(e) =>
                                setEditReviewData({
                                  ...editReviewData,
                                  comment: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="edit-actions">
                            <button
                              className="btn-save"
                              onClick={() =>
                                saveEditReview(review.businessId, review.id)
                              }
                            >
                              Save Changes
                            </button>
                            <button
                              className="btn-cancel"
                              onClick={() => setEditingReviewId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <>
                          <div className="review-header">
                            <div>
                              <h4>
                                {review.title} on{" "}
                                <button
                                  className="business-link"
                                  onClick={() =>
                                    onNavigate("details", { id: review.businessId })
                                  }
                                >
                                  {review.businessName}
                                </button>
                              </h4>
                              <span className="stars">
                                {"⭐".repeat(review.rating)}
                              </span>
                            </div>
                            <span className="review-date">{review.date}</span>
                          </div>
                          <p className="review-comment">{review.comment}</p>
                          <div className="review-actions">
                            <button
                              className="btn-edit-review"
                              onClick={() => startEditReview(review, review.businessId)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn-delete-review"
                              onClick={() =>
                                onDeleteReview(review.businessId, review.id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't written any reviews yet.</p>
                  <button
                    className="btn-browse"
                    onClick={() => onNavigate("browse")}
                  >
                    🔍 Browse Businesses
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
