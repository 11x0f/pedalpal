import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { Bid, paramPhone } = useParams();

  const cyclesData = JSON.parse(localStorage.getItem("cycles")) || [];
  const selectedCycle = cyclesData.find((c) => c.id === Number(Bid));

  const existingData = localStorage.getItem("customerData");
  const customerData = existingData ? JSON.parse(existingData) : [];

  const alreadyExists = customerData.some(
    (c) => c.phoneNumber === paramPhone && c.uniqueId === selectedCycle?.unqId
  );

  if (!alreadyExists) {
    customerData.push({ phoneNumber: paramPhone, uniqueId: selectedCycle?.unqId });
    localStorage.setItem("customerData", JSON.stringify(customerData));
  }

  return (
    <div>
      <Header />

      <div className="co-page">
        <div className="co-card">

          <div className="co-icon">✓</div>

          <h1 className="co-title">Booking confirmed</h1>
          <p className="co-sub">Your bike is ready. Enjoy the ride.</p>

          <div className="co-details">
            <div className="co-row">
              <span>Bike</span>
              <strong>#{Bid}</strong>
            </div>
            <div className="co-row">
              <span>Phone</span>
              <strong>{paramPhone}</strong>
            </div>
            {selectedCycle && (
              <div className="co-row">
                <span>Type</span>
                <strong>{selectedCycle.model}</strong>
              </div>
            )}
            {selectedCycle && (
              <div className="co-row">
                <span>Hub</span>
                <strong>{selectedCycle.position}</strong>
              </div>
            )}
          </div>

          <div className="co-return-id-box">
            <p className="co-return-label">Return ID — save this</p>
            <p className="co-return-id">{selectedCycle?.unqId}</p>
            <p className="co-return-hint">
              You'll need this code to return the bike.
            </p>
          </div>

          <div className="co-actions">
            <button className="co-home-btn" onClick={() => navigate("/home")}>
              Back to home
            </button>
            <Link to="/tracker" className="co-return-link">
              Track my ride →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;