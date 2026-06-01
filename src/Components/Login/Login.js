import React, {
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const storedPhone =
        sessionStorage.getItem(
            "phoneNumber"
        );

    useEffect(() => {

        if (storedPhone) {
            navigate("/home");
        }

    }, [navigate, storedPhone]);

    const generateOtp = () => {

        const generatedOtp =
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        console.log(
            "OTP sent to",
            phoneNumber,
            ":",
            generatedOtp
        );

        setOtp(
            generatedOtp.toString()
        );
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!phoneNumber.trim()) {
            return;
        }

        sessionStorage.setItem(
            "phoneNumber",
            phoneNumber
        );

        navigate("/home");
    };

    return (

        <div className="login-container">

            <div className="login-form">

                <h2>
                    Welcome Back 🚲
                </h2>

                <p className="login-subtitle">
                    Book your next ride instantly.
                </p>

                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(event) =>
                            setPhoneNumber(
                                event.target.value
                            )
                        }
                        required
                    />

                    <button
                        type="button"
                        className="otp-btn"
                        onClick={generateOtp}
                    >
                        Generate OTP
                    </button>

                    <label>
                        OTP
                    </label>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(event) =>
                            setOtp(
                                event.target.value
                            )
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;