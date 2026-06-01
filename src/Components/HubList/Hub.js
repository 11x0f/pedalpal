import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";

import "./Hub.css";

function Hub() {

    const navigate = useNavigate();

    const [selectedHub, setSelectedHub] =
        useState("");

    const hubs = [
        {
            id: "railway",
            name: "Kannur Railway Station",
            icon: "🚆",
            desc: "Fast city pickup point",
        },
        {
            id: "airport",
            name: "Kannur International Airport",
            icon: "✈️",
            desc: "Traveler's mobility hub",
        },
        {
            id: "payyambalam",
            name: "Payyambalam Beach",
            icon: "🏖️",
            desc: "Ride along the coastline",
        },
        {
            id: "fortroad",
            name: "Fort Road",
            icon: "🏙️",
            desc: "Central city location",
        },
    ];

    const handleNavigate = () => {

        if (!selectedHub) {
            return;
        }

        navigate(
            `/cyclelist/${selectedHub}`
        );
    };

    return (
        <div>

            <Header />

            <div className="hub-page">

                <div className="hub-header">

                    <h1>
                        Choose Your Pickup Hub
                    </h1>

                    <p>
                        Find bicycles near
                        popular places in Kannur.
                    </p>

                </div>

                <div className="hub-grid">

                    {hubs.map((hub) => (

                        <div
                            key={hub.id}
                            className={`hub-card ${
                                selectedHub === hub.id
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setSelectedHub(
                                    hub.id
                                )
                            }
                        >

                            <div className="hub-icon">
                                {hub.icon}
                            </div>

                            <h3>
                                {hub.name}
                            </h3>

                            <p>
                                {hub.desc}
                            </p>

                        </div>

                    ))}

                </div>

                <button
                    className="continue-btn"
                    onClick={handleNavigate}
                    disabled={!selectedHub}
                >
                    View Available Cycles
                </button>

            </div>

        </div>
    );
}

export default Hub;