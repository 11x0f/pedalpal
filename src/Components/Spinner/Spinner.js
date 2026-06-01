import React from "react";

import { Spinner } from "react-bootstrap";

import "./Spinner.css";

function SpinnerComp() {

    return (

        <div className="spinner-wrapper">

            <div className="spinner-card">

                <Spinner
                    animation="border"
                    role="status"
                    className="pedal-spinner"
                >

                    <span className="visually-hidden">
                        Loading...
                    </span>

                </Spinner>

                <h4>
                    Loading PedalPal
                </h4>

                <p>
                    Preparing your ride...
                </p>

            </div>

        </div>

    );
}

export default SpinnerComp;