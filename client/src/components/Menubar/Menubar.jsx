import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import "../../css/components/menubar.css";

export default function Menubar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <a className="navbar-brand" href="#">
        <img src={assets.logo} alt="Logo" height="40" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className={
                location.pathname === "/dashboard"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/explore"
              className={
                location.pathname === "/explore"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/items"
              className={
                location.pathname === "/items" ? "nav-link active" : "nav-link"
              }
            >
              Manage items
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/category"
              className={
                location.pathname === "/category"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Manage categories
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/users"
              className={
                location.pathname === "/users" ? "nav-link active" : "nav-link"
              }
            >
              Manage users
            </Link>
          </li>
        </ul>
        {/* TODO: dropdown for user profile */}
      </div>
    </nav>
  );
}
