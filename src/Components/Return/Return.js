import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Return.css";

function Return() {
  const navigate = useNavigate();
  const { phoneNumber, uniqueId, rlocation } = useParams();

  const handleDone = () => {
    // Remove from active customers
    const customers = JSON.parse(localStorage.getItem("customerData") || "[]");
    localStorage.setItem(
      "customerData",
      JSON.stringify(customers.filter(
        (c) => !(c.phoneNumber === phoneNumber && c.uniqueId === uniqueId)
      ))
    );

    // Mark bike as available at return hub
    const cycles = JSON.parse(localStorage.getItem("cycles") || "[]");
    localStorage.setItem(
      "cycles",
      JSON.stringify(
        cycles.map((c) =>
          c.unqId === uniqueId ? { ...c, isBooked: false, position: rlocation } : c
        )
      )
    );

    // Update ride history — mark as completed, add return hub
    const history = JSON.parse(localStorage.getItem("rideHistory") || "[]");
    localStorage.setItem(
      "rideHistory",
      JSON.stringify(
        history.map((r) =>
          r.uniqueId === uniqueId && r.status === "active"
            ? { ...r, status: "completed", returnHub: rlocation, returnDate: new Date().toISOString() }
            : r
        )
      )
    );

    navigate("/home");
  };

  return (
    <div>
      <Header />
      <div className="ret-page">
        <div className="ret-card">

          <div className="ret-icon">✓</div>

          <h1 className="ret-title">Bike returned!</h1>
          <p className="ret-sub">Your ride has been successfully completed. Thanks for riding with PedalPal.</p>

          <div className="ret-details">
            <div className="ret-row">
              <span>Phone</span>
              <strong>{phoneNumber}</strong>
            </div>
            <div className="ret-row">
              <span>Return hub</span>
              <strong>{rlocation}</strong>
            </div>
            <div className="ret-row">
              <span>Return ID</span>
              <strong className="ret-mono">{uniqueId}</strong>
            </div>
          </div>

          <div className="ret-actions">
            <button className="ret-home-btn" onClick={handleDone}>
              Back to home
            </button>
            <Link to="/profile" className="ret-ride-link">
              View ride history →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Return;