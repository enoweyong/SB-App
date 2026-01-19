import { useState } from "react";
import "./SignUp.css";

export default function SignUp({ onSwitchToSignIn, onSignUpSuccess }) {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateSignUp = () => {
    const newErrors = {};
    if (!signUpData.name.trim()) newErrors.name = "Full name is required";
    if (!signUpData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email))
      newErrors.email = "Invalid email format";
    if (!signUpData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!signUpData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!signUpData.password) newErrors.password = "Password is required";
    if (signUpData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (signUpData.password !== signUpData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!signUpData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateSignUp();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      setSuccessMessage("Account created successfully! Opening dashboard...");
      const userEmail = signUpData.email;
      console.log("Sign Up Data:", signUpData);
      
      setSignUpData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
      
      // Redirect to dashboard immediately
      onSignUpSuccess(userEmail);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-box">
          {/* Back Button */}
          <button className="back-button" onClick={onSwitchToSignIn}>
            ← Back to Sign In
          </button>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-header">
              <h1>Create Your Account</h1>
              <p>Join Smooth Business and grow your business</p>
              <div className="divider"></div>
            </div>

            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={signUpData.name}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, name: e.target.value })
                  }
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={signUpData.phone}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, phone: e.target.value })
                  }
                  className={errors.phone ? "input-error" : ""}
                />
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  id="businessName"
                  type="text"
                  placeholder="Your Business"
                  value={signUpData.businessName}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      businessName: e.target.value,
                    })
                  }
                  className={errors.businessName ? "input-error" : ""}
                />
                {errors.businessName && (
                  <span className="error-text">{errors.businessName}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                  className={errors.password ? "input-error" : ""}
                />
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={signUpData.confirmPassword}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <div className="form-group checkbox">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={signUpData.agreeToTerms}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    agreeToTerms: e.target.checked,
                  })
                }
              />
              <label htmlFor="agreeToTerms">
                I agree to the{" "}
                <a href="#" className="terms-link">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="terms-link">
                  Privacy Policy
                </a>
              </label>
              {errors.agreeToTerms && (
                <span className="error-text">{errors.agreeToTerms}</span>
              )}
            </div>

            <button type="submit" className="btn-signup">
              Create Account
            </button>

            <p className="signin-link">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="link-button"
              >
                Sign In here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}