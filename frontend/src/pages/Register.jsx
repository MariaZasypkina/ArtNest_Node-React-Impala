import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");    // for errors
  const [success, setSuccess] = useState(""); // for success

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("Form data before sending:", formData);

      const response = await fetch("http://localhost:5010/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      setSuccess("User registered successfully! 🎉");  // Сообщение об успехе
    } catch (error) {
      setError(error.message);  // Отображаем ошибку
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {success && <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" className="input-field" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} required />
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
