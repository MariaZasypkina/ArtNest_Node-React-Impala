import { useNavigate } from "react-router-dom";

    const Dashboard = () => {
        const navigate = useNavigate();
      
        const handleLogout = () => {
          localStorage.removeItem("token"); // Remove the token
          navigate("/login"); // Redirect to login page
        };
      
    return (
      <div>
        <h2>Welcome to your Dashboard!</h2>
        <p>Protected content visible only to logged-in users.</p>
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </div>
    );
  };
  
  export default Dashboard;
  