import { useState } from "react";
import "./SignIn.css";
import { useNavigate, Link } from "react-router-dom";
import {API} from "./api";


export default function SignIn()  {

  const navigate = useNavigate();
  const[formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    localStorage.setItem("token", "dummy-token")
    navigate("/dashboard");
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));
      navigate("/dashboard");
    }
     catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
          <p className = 'subtitle'>Sign in to continue</p>
          {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>

  <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value ={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Email Address</label>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value ={formData.password}
                  onChange={handleChange}
                 required
                />
                <label>Password</label>
              </div>
              <button type="submit" className="signin-btn" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
                </button>
              <div className='extra'>
              <p className="signup-link">
                Don't have an account? <Link to ="/signup" className="link-button">Sign up</Link>
              </p>
              </div>
            </form>
          </div>
        </div>
  );
}