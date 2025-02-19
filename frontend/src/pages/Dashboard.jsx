import { useNavigate } from "react-router-dom";
import Tips from "../../components/Tips";// Import Tips component

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
      <Tips /> {/* Display tips in the dashboard */}
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </div>
    );
  };
  
  export default Dashboard;
  