import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");    // State for error message
  const [success, setSuccess] = useState(""); // State for success message
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data before sending:", formData);

      const response = await fetch("http://localhost:5010/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // If login is successful, show success message and save token
      setSuccess("Login successful! 🎉");
      localStorage.setItem("token", data.token);
      setTimeout(() => navigate("/dashboard"), 1500); // Redirect after 1.5 seconds
    } catch (error) {
      setError(error.message);  // Display error message
    }
  };

  return (
<div className="login-form">
      <h2>Login</h2>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {success && <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Login</button>
        </div>
      </form>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <p>Or you can <a href="/register" style={{ color: 'green', textDecoration: 'underline' }}>register here</a>.</p>
      </div>
    </div>
  );
};

export default Login;
