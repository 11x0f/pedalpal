import React from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import Header from "../Header/Header";

import "./Return.css";

function BikeReturnMessage() {

    const navigate = useNavigate();

    const {
        phoneNumber,
        uniqueId,
        rlocation,
    } = useParams();

    const returnToHome = () => {

        const existingCustomers =
            JSON.parse(
                localStorage.getItem(
                    "customerData"
                )
            ) || [];

        const filteredCustomers =
            existingCustomers.filter(
                (customer) =>

                    customer.phoneNumber !==
                        phoneNumber ||

                    customer.uniqueId !==
                        uniqueId
            );

        localStorage.setItem(

            "customerData",

            JSON.stringify(
                filteredCustomers
            )
        );

        const existingCycles =
            JSON.parse(
                localStorage.getItem(
                    "cycles"
                )
            ) || [];

        const updatedCycles =
            existingCycles.map(
                (cycle) => {

                    if (
                        cycle.unqId ===
                        uniqueId
                    ) {

                        return {

                            ...cycle,

                            isBooked: false,

                            position:
                                rlocation,
                        };
                    }

                    return cycle;
                }
            );

        localStorage.setItem(

            "cycles",

            JSON.stringify(
                updatedCycles
            )
        );

        navigate("/home");
    };

    return (

        <div>

            <Header />

            <div className="return-page">

                <div className="return-card">

                    <div className="success-circle">
                        ✓
                    </div>

                    <h1>
                        Bike Returned!
                    </h1>

                    <p>
                        Your ride has been
                        successfully returned.
                    </p>

                    <div className="summary-box">

                        <div className="summary-row">

                            <span>
                                Phone Number
                            </span>

                            <strong>
                                {phoneNumber}
                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>
                                Return Hub
                            </span>

                            <strong>
                                {rlocation}
                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>
                                Return ID
                            </span>

                            <strong>
                                {uniqueId}
                            </strong>

                        </div>

                    </div>

                    <div className="thank-you-box">

                        Thank you for riding
                        with PedalPal 🚲

                    </div>

                    <button
                        className="home-btn"
                        onClick={
                            returnToHome
                        }
                    >
                        Return Home
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BikeReturnMessage;