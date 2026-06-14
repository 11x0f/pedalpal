import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./CycleList.css";

const MODEL_META = {
  "Mountain Bike": { hint: "Best for rough terrain" },
  "City Bike":     { hint: "Smooth urban commute"   },
  "Road Bike":     { hint: "Built for speed"        },
};

function CycleList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("phoneNumber")) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const stored = localStorage.getItem("cycles");
    if (stored) setCycles(JSON.parse(stored));
  }, []);

  const filtered = cycles.filter(
    (c) => c.position.toLowerCase() === id.toLowerCase() && !c.isBooked
  );

  return (
    <div>
      <Header />

      <div className="cl-page">
        <div className="cl-header">
          <Link to="/hub" className="cl-back">← Back to hubs</Link>
          <p className="cl-eyebrow">Step 2 of 3</p>
          <h1 className="cl-title">
            Available bikes at <span>{id}</span>
          </h1>
          <p className="cl-sub">
            {filtered.length > 0
              ? `${filtered.length} bike${filtered.length !== 1 ? "s" : ""} ready to rent — scroll to browse`
              : "No bikes available at this hub right now"}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="cl-scroll-wrapper">
            <div className="cl-strip">
              {filtered.map((cycle) => (
                <div key={cycle.id} className="cl-card">
                  <div className="cl-card-head">
                    <span className="cl-bike-id">#{cycle.id}</span>
                    <span className="cl-badge">Available</span>
                  </div>

                  <h3 className="cl-model">{cycle.model}</h3>
                  <p className="cl-hint">{MODEL_META[cycle.model]?.hint}</p>

                  <div className="cl-divider" />

                  <div className="cl-price-row">
                    <span className="cl-price">₹{cycle.price}</span>
                    <span className="cl-per">/hour</span>
                  </div>

                  <button
                    className="cl-rent-btn"
                    onClick={() => navigate(`/userdetails/${cycle.id}`)}
                  >
                    Rent this bike →
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="cl-empty">
            <p className="cl-empty-icon">🚲</p>
            <h2>No bikes here right now</h2>
            <p>Try another hub or check back soon.</p>
            <Link to="/hub" className="cl-empty-link">Choose a different hub →</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CycleList;