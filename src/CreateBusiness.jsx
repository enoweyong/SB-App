import { useState } from "react";
import "./CreateBusiness.css";

export default function CreateBusiness({ onNavigate, onCreateBusiness }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Retail",
    location: "",
    phone: "",
    email: "",
    website: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const categories = [
    "Retail",
    "Food & Beverage",
    "Services",
    "Healthcare",
    "Technology",
    "Finance",
    "Education",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Business name is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.description.length < 20)
      newErrors.description = "Description must be at least 20 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
    } else {
      const newBusiness = {
        id: Date.now(),
        ...formData,
        rating: 0,
        reviews: [],
        createdAt: new Date().toLocaleDateString(),
      };

      onCreateBusiness(newBusiness);
      setErrors({});
      setSuccessMessage("Business created successfully! Redirecting...");

      setTimeout(() => {
        setFormData({
          name: "",
          category: "Retail",
          location: "",
          phone: "",
          email: "",
          website: "",
          description: "",
        });
        onNavigate("profile");
      }, 2000);
    }
  };

  return (
    <div className="create-business-container">
      <header className="page-header">
        <button className="btn-back" onClick={() => onNavigate("dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>Create New Business</h1>
        <p>Add your business to the Smooth Business platform</p>
      </header>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="business-form">
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Business Name *</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter business name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>
            </div>

            <div className="form-row full-width">
              <div className="form-group full-width">
                <label>Select Category *</label>
                <div className="category-selector">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`category-option ${
                        formData.category === cat ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, category: cat })
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <span className="error-text">{errors.category}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  id="location"
                  type="text"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className={errors.location ? "input-error" : ""}
                />
                {errors.location && (
                  <span className="error-text">{errors.location}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={errors.phone ? "input-error" : ""}
                />
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="business@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="website">Website (Optional)</label>
                <input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Business Description</h2>
            <div className="form-group full-width">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                placeholder="Describe your business, services, and what makes it special..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="6"
                className={errors.description ? "input-error" : ""}
              />
              <small className="char-count">
                {formData.description.length} / 500 characters
              </small>
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => onNavigate("dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create Business
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
