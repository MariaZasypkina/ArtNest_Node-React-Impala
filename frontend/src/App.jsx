import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import UploadPage from "./pages/UploadPage";
import SuppliesPage from "./pages/SuppliesPage";
import NotFound from "./pages/NotFound";
import './App.css';

const App = () => {
  return (
    <>

<header className="app-header">
        <h1>ArtNest</h1>
        <p className="app-slogan">Where Creativity Comes to Life</p>
      </header>

      <nav className="app-nav">
                <Link to="/">Home</Link> |
                <Link to="/register">Register</Link> |
                <Link to="/login">Login</Link> |
                <Link to="/dashboard">Dashboard</Link> |
                <Link to="/supplies">Supplies</Link> |
                <Link to="/gallery">Gallery</Link> |
                <Link to="/upload">Upload</Link>
            </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/supplies" element={<SuppliesPage />} />
        <Route path="/gallery" element={<Gallery />} /> 
        <Route path="/upload" element={<UploadPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
