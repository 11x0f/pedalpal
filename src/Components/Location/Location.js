import React from "react";

import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Map from "../Map/Map";

import "./Location.css";

function Location() {

    const navigate = useNavigate();

    const handleProceed = () => {
        navigate("/hub");
    };

    return (
        <div className="location-page">

            <Header />

            <main className="location-container">

                <Map />

                <div className="booking-card">

                    <h3>
                        Select a Nearby Hub
                    </h3>

                    <p>
                        Explore bicycle hubs on the map
                        and continue to booking.
                    </p>

                    <button
                        className="proceed-button"
                        onClick={handleProceed}
                    >
                        Proceed to Book
                    </button>

                </div>

            </main>

        </div>
    );
}

export default Location;