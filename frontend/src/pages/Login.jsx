import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      console.log("Response from server:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token
        alert("Login successful!"); // Temporary success message
        navigate("/dashboard"); // Redirect after login
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
<div className="login-form">
      <h2>Login</h2>
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
