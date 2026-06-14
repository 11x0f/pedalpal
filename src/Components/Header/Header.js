import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logo.jpg";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasActiveRide, setHasActiveRide] = useState(false);

  useEffect(() => {
    const phone = sessionStorage.getItem("phoneNumber");
    const history = JSON.parse(localStorage.getItem("rideHistory") || "[]");
    setHasActiveRide(history.some((r) => r.phone === phone && r.status === "active"));
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem("phoneNumber");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/home" className="header-brand">
          <img src={logo} alt="PedalPal" className="header-logo" />
          <span>PedalPal</span>
        </Link>

        <nav className="header-nav">
          <Link to="/home" className="header-link">Home</Link>
          <Link to="/hub" className="header-link">Find a bike</Link>
          <Link to="/returnForm" className="header-link">Return</Link>
          <Link to="/tracker" className="header-link header-link--tracker">
            {hasActiveRide && <span className="header-active-dot" />}
            My ride
          </Link>
          <Link to="/profile" className="header-link">My rides</Link>
        </nav>

        <button className="header-logout" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Header;