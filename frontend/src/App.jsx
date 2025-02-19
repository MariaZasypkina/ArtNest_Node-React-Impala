import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";

const App = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/register">Register</Link> |
        <Link to="/login">Login</Link> |
        <Link to="/dashboard">Dashboard</Link> |
        <Link to="/gallery">Gallery</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} /> 
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
