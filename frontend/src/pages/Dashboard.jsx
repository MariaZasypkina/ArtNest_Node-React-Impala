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
             <h2>Welcome to your Dashboard Artist!</h2>
      <p>Boost your creativity here!<br></br>This is your own page <br></br>It's visible only to you</p>
      <br></br>
      <Tips /> {/* Display tips in the dashboard */}
      <br></br>
        <button onClick={handleLogout}className="submit-button">Logout</button> {/* Logout button */}
      </div>
    );
  };
  
  export default Dashboard;
  