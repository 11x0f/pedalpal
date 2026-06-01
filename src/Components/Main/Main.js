import "./Main.css";

import { useNavigate } from "react-router-dom";

import logo from "./logo.jpg";

function Main() {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/map");
    };

    return (
        <section className="hero">

            <div className="hero-left">

                <h1>
                    Ride Smart.
                    <br />
                    Ride Easy.
                    <br />
                    Ride PedalPal.
                </h1>

                <p>
                    Discover nearby bicycles,
                    unlock instantly,
                    and enjoy smarter urban mobility.
                </p>

                <button
                    className="hero-btn"
                    onClick={handleNavigate}
                >
                    Find Bikes Nearby
                </button>

            </div>

            <div className="hero-right">

                <img
                    src={logo}
                    alt="PedalPal Hero"
                />

            </div>

        </section>
    );
}

export default Main;