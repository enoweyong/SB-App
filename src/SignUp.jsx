import React from 'react'
import { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
  import {API}  from "./api";

const SignUp = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
   fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
     phone: "",
    businessName: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
         setLoading(true);
        if(formData.password !== formData.confirmPassword){
          setLoading(false);
          return setError("Passwords do not match");
        }
        if(!formData.agreeToTerms){
          setLoading(false);
          return setError("You must agree to the terms and conditions");
        }
        try{
          const res = await API.post("/api/auth/register", formData);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          alert("Registration successful!");
         navigate("/dashboard");
            
        }   
        catch (err) {
          console.log(err.response?.data);
          setError(err.response?.data?.error || "Registration failed. Please try again.");
        } finally {
          setLoading(false);  
        }
      };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account On Smooth Business</h2>
        <p className ='subtitle'>Join smooth Business and grow your business</p>
        {error && <div className="error-message">{error}</div>}
          {/* Back Button */}
          <button className="back-button" onClick={() => navigate("/signin")}>
            ← Back to Sign In
          </button>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  id="name"
                  type="text"
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                 <label htmlFor="name">Full Name</label>
              </div>

              <div className="input-group">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
                   <label htmlFor="email">Email Address</label>
              </div>
              <div className="input-group">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                 required
                />
                <label htmlFor="phone">Phone Number</label>
              </div>

              <div className="input-group">
                <input
                  id="businessName"
                  type="text"
                  name='businessName'
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
                 <label htmlFor="businessName">Business Name</label>
              </div>
              <div className="input-group">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="input-group">
                <input
                  id="confirmPassword"
                  type="password"
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
            <div className="checkbox-group">
              <input
                id="agreeToTerms"
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}   
              />
              <label htmlFor="agreeToTerms">
                I agree to the{" "}
                <span className ="terms-link"> Terms and Conditions</span>{" "}
                and privacy policy.
              </label>
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account" }
            </button>
          <div className='extra'>
            <p className="signin-link">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="link-button"
              >
                Sign In here
              </Link>
            </p>
            </div>
          </form>
        </div>
      </div>
   
  )
}

export default SignUp