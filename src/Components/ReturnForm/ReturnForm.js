import React, { useState, useEffect } from "react";
import "./ReturnForm.css";

import Header from "../Header/Header";

import { useNavigate } from "react-router-dom";

const ReturnForm = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [uniqueKey, setUniqueKey] = useState("");
    const [rLocation, setRLocation] = useState("");

    const phoneNum =
        sessionStorage.getItem("phoneNumber");

    const navigate = useNavigate();

    useEffect(() => {

        if (phoneNum === null) {
            navigate("/");
        }

    }, [navigate, phoneNum]);

    const handleSubmit = (e) => {

        e.preventDefault();

        navigate(
            `/return/${phoneNumber}/${uniqueKey}/${rLocation}`
        );
    };

    return (
        <div>
            <Header />

            <div className="form-container">

                <form
                    className="form"
                    onSubmit={handleSubmit}
                >

                    <h2 className="form-title">
                        Return Your Bike
                    </h2>

                    <p className="form-subtitle">
                        Enter your booking details
                    </p>

                    <label className="form-label">
                        Phone Number
                    </label>

                    <input
                        className="form-input"
                        type="tel"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(
                                e.target.value
                            )
                        }
                        required
                    />

                    <label className="form-label">
                        Unique Key
                    </label>

                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter booking key"
                        value={uniqueKey}
                        onChange={(e) =>
                            setUniqueKey(
                                e.target.value
                            )
                        }
                        required
                    />

                    <label className="form-label">
                        Return Hub
                    </label>

                    <select
                        className="form-select"
                        value={rLocation}
                        onChange={(e) =>
                            setRLocation(
                                e.target.value
                            )
                        }
                        required
                    >
                        <option value="">
                            Select Return Location
                        </option>

                        <option value="Railway">
                            Railway Station
                        </option>

                        <option value="Airport">
                            Airport
                        </option>

                        <option value="Lulu Mall">
                            Lulu Mall
                        </option>

                    </select>

                    <button
                        className="form-button"
                        type="submit"
                    >
                        Proceed
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ReturnForm;