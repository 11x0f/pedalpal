import React, {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import Header from "../Header/Header";

import "./CycleList.css";

function CycleList() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [cyclesData, setCyclesData] =
        useState([]);

    const phoneNumber =
        sessionStorage.getItem(
            "phoneNumber"
        );

    useEffect(() => {

        if (!phoneNumber) {
            navigate("/");
        }

    }, [navigate, phoneNumber]);

    useEffect(() => {

        const storedCycles =
            localStorage.getItem(
                "cycles"
            );

        if (storedCycles) {

            setCyclesData(
                JSON.parse(storedCycles)
            );
        }

    }, []);

    const handleRentClick = (
        cycleId
    ) => {

        navigate(
            `/userdetails/${cycleId}`
        );
    };

    const filteredCycles =
        cyclesData.filter(
            (cycle) =>

                cycle.position
                    .toLowerCase() ===
                id.toLowerCase() &&

                !cycle.isBooked
        );

    return (

        <div className="cycle-page">

            <Header />

            <div className="cycle-container">

                <div className="page-header">

                    <h1>
                        Available Cycles
                    </h1>

                    <p>
                        Choose your next
                        eco-friendly ride at
                        <strong>
                            {" "} {id}
                        </strong>
                    </p>

                </div>

                <div className="cycle-grid">

                    {filteredCycles.length > 0 ? (

                        filteredCycles.map(
                            (cycle) => (

                                <div
                                    key={cycle.id}
                                    className="cycle-card"
                                >

                                    <div className="card-top">

                                        <div className="cycle-id">
                                            #{cycle.id}
                                        </div>

                                        <div className="status-badge">
                                            Available
                                        </div>

                                    </div>

                                    <div className="cycle-model">
                                        🚲 {cycle.model}
                                    </div>

                                    <div className="cycle-price">
                                        ₹{cycle.price}

                                        <span>
                                            /hour
                                        </span>
                                    </div>

                                    <div className="cycle-location">
                                        📍 {cycle.position}
                                    </div>

                                    <button
                                        className="rent-btn"
                                        onClick={() =>
                                            handleRentClick(
                                                cycle.id
                                            )
                                        }
                                    >
                                        Rent Now
                                    </button>

                                </div>
                            )
                        )

                    ) : (

                        <div className="empty-state">

                            <h2>
                                No Cycles Available
                            </h2>

                            <p>
                                Try another hub
                                or check again later.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default CycleList;