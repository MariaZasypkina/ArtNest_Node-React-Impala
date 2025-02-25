import Tips from "../../components/Tips";
import Gallery from "./Gallery";
import Login from "./Login";
import "./Home.css";

const Home = () => {
  return (
    <div className="card-container">
      <div className="tip-section">
        <Tips /> {/* Display tips on the home page */}
      </div>

      <div className="login-section">
        <Login />
      </div>
    </div>
  );
};

export default Home;
