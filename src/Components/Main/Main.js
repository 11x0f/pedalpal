import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import "./Main.css";

function Main() {
  const navigate = useNavigate();

  const stats = [
    { value: "15+", label: "Bikes available" },
    { value: "4", label: "Pickup hubs" },
    { value: "₹8", label: "From per hour" },
    { value: "0 kg", label: "CO₂ per ride" },
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Kannur, Kerala</p>
          <h1 className="hero-heading">
            Ride smart.<br />
            Ride <span className="hero-accent">PedalPal.</span>
          </h1>
          <p className="hero-body">
            Discover bicycles near you, book instantly, and enjoy
            eco-friendly urban mobility across Kannur.
          </p>
          <button className="hero-btn" onClick={() => navigate("/hub")}>
            Find bikes nearby →
          </button>
        </div>

        <div className="hero-image">
          <img src={logo} alt="PedalPal" />
        </div>
      </section>


    </main>
  );
}

export default Main;