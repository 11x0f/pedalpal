import React from "react";

import "./SingleCycle.css";

function SingleCycle({ cycle }) {

    const {
        image,
        name,
        available,
        hub,
        speed,
        waitingTime,
    } = cycle;

    const handleBook = () => {
        console.log("booking");
    };

    return (

        <div className="single-cycle-card">

            <div className="cycle-image-wrapper">

                <img
                    src={image}
                    alt={name}
                    className="cycle-image"
                />

                <div className="image-overlay" />

                <span
                    className={`status-badge ${
                        available
                            ? "available"
                            : "busy"
                    }`}
                >
                    {available
                        ? "Available"
                        : "Busy"}
                </span>

            </div>

            <div className="cycle-content">

                <div className="title-row">

                    <h3>{name}</h3>

                    <span className="eco-tag">
                        Eco Ride
                    </span>

                </div>

                <p className="hub-name">
                    📍 {hub}
                </p>

                <div className="cycle-stats">

                    <div className="stat-box">

                        <div className="stat-label">
                            Speed
                        </div>

                        <div className="stat-value">
                            ⚡ {speed}
                        </div>

                    </div>

                    <div className="stat-box">

                        <div className="stat-label">
                            Wait Time
                        </div>

                        <div className="stat-value">
                            ⏱ {waitingTime}
                        </div>

                    </div>

                </div>

                <button
                    className="rent-btn"
                    onClick={handleBook}
                    disabled={!available}
                >
                    {available
                        ? "Book Ride"
                        : "Currently Unavailable"}
                </button>

            </div>

        </div>

    );
}

export default SingleCycle;