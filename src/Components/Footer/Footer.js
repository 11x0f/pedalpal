import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-name">PedalPal</span>
          <p className="footer-tagline">
            Smart bicycle rentals for greener urban commuting.
          </p>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Navigate</p>
          <Link to="/home">Home</Link>
          <Link to="/hub">Find a bike</Link>
          <Link to="/returnForm">Return a bike</Link>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Contact</p>
          <span>support@pedalpal.com</span>
          <span>+91 98765 43210</span>
          <span>Kannur, Kerala</span>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 PedalPal · Ride smart. Ride easy.
      </div>
    </footer>
  );
}

export default Footer;