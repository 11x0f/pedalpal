import React from "react";

import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {

    return (
        <footer className="footer">

            <div className="footer-content">

                <div className="footer-section">

                    <h3>🚲 PEDALPAL</h3>

                    <p>
                        Smart bicycle rentals for
                        faster, greener, and
                        hassle-free commuting.
                    </p>

                </div>

                <div className="footer-section">

                    <h4>Quick Links</h4>

                    <Link to="/home">
                        Home
                    </Link>

                    <Link to="/map">
                        Locate Bikes
                    </Link>

                    <Link to="/returnForm">
                        Return Bike
                    </Link>

                </div>

                <div className="footer-section">

                    <h4>Contact</h4>

                    <p>support@pedalpal.com</p>

                    <p>+91 98765 43210</p>

                    <p>Kochi, Kerala</p>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 PedalPal —
                Ride Smart. Ride Easy.

            </div>

        </footer>
    );
}

export default Footer;