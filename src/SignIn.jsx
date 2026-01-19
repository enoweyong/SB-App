import { useState } from "react";
import "./SignIn.css";

export default function SignIn({ onSwitchToSignUp, onSignInSuccess }) {
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateSignIn = () => {
    const newErrors = {};
    if (!signInData.email) newErrors.email = "Email is required";
    if (!signInData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateSignIn();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      setSuccessMessage("Sign In successful! Welcome back.");
      const userEmail = signInData.email;
      setSignInData({ email: "", password: "" });
      setTimeout(() => {
        onSignInSuccess(userEmail);
      }, 1500);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <div className="signin-box signin-mode">
          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignInSubmit}>
              <h1>Sign In</h1>
              <div className="divider"></div>

              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={signInData.email}
                  onChange={(e) =>
                    setSignInData({ ...signInData, email: e.target.value })
                  }
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={signInData.password}
                  onChange={(e) =>
                    setSignInData({ ...signInData, password: e.target.value })
                  }
                  className={errors.password ? "input-error" : ""}
                />
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <a href="#" className="forgot-password">
                Forgot your password?
              </a>

              <button type="submit" className="btn-signin">
                Sign In
              </button>

              <p className="signup-link">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignUp}
                  className="link-button"
                >
                  Sign Up here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}