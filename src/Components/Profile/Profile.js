import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const phone = sessionStorage.getItem("phoneNumber");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!phone) navigate("/");
    const all = JSON.parse(localStorage.getItem("rideHistory") || "[]");
    setHistory(all.filter((r) => r.phone === phone));
  }, [navigate, phone]);

  const completed = history.filter((r) => r.status === "completed");
  const active    = history.find((r) => r.status === "active");

  const totalSpent  = completed.reduce((s, r) => s + r.amount, 0);
  const totalRides  = completed.length;
  const favHub      = (() => {
    const counts = {};
    completed.forEach((r) => { counts[r.pickupHub] = (counts[r.pickupHub] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  })();

  const fmt = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) +
      " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  const fmtDur = (h, m) => `${h}h ${String(m).padStart(2, "0")}m`;

  return (
    <div>
      <Header />

      <div className="prof-page">

        {/* Profile header */}
        <div className="prof-hero">
          <div className="prof-avatar">
            {phone?.slice(-2)}
          </div>
          <div>
            <p className="prof-phone">{phone}</p>
            <p className="prof-label">PedalPal rider</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="prof-stats">
          <div className="prof-stat">
            <span className="prof-stat-val">{totalRides}</span>
            <span className="prof-stat-lbl">Total rides</span>
          </div>
          <div className="prof-stat">
            <span className="prof-stat-val">₹{totalSpent.toFixed(0)}</span>
            <span className="prof-stat-lbl">Total spent</span>
          </div>
          <div className="prof-stat">
            <span className="prof-stat-val">{favHub}</span>
            <span className="prof-stat-lbl">Favourite hub</span>
          </div>
        </div>

        {/* Active ride */}
        {active && (
          <div className="prof-section">
            <p className="prof-section-title">Active ride</p>
            <div className="prof-active-card">
              <div className="prof-active-dot" />
              <div className="prof-active-info">
                <p className="prof-active-name">Bike #{active.bikeId} · {active.bikeModel}</p>
                <p className="prof-active-meta">
                  Picked up from <strong>{active.pickupHub}</strong> · {fmtDur(active.hours, active.minutes)} booked
                </p>
              </div>
              <Link to="/returnForm" className="prof-return-btn">Return bike →</Link>
            </div>
          </div>
        )}

        {/* Ride history */}
        <div className="prof-section">
          <p className="prof-section-title">Ride history</p>

          {completed.length === 0 ? (
            <div className="prof-empty">
              <p className="prof-empty-icon">🚲</p>
              <p className="prof-empty-title">No rides yet</p>
              <p className="prof-empty-sub">Your completed rides will appear here.</p>
              <Link to="/hub" className="prof-empty-link">Book your first ride →</Link>
            </div>
          ) : (
            <div className="prof-ride-list">
              {completed.map((ride) => (
                <div key={ride.id} className="prof-ride-card">
                  <div className="prof-ride-top">
                    <div>
                      <p className="prof-ride-title">Bike #{ride.bikeId} · {ride.bikeModel}</p>
                      <p className="prof-ride-date">{fmt(ride.date)}</p>
                    </div>
                    <span className="prof-ride-amount">₹{ride.amount.toFixed(2)}</span>
                  </div>

                  <div className="prof-ride-meta">
                    <div className="prof-ride-meta-item">
                      <span className="prof-ride-meta-lbl">Picked up</span>
                      <span className="prof-ride-meta-val">{ride.pickupHub}</span>
                    </div>
                    <div className="prof-ride-meta-arrow">→</div>
                    <div className="prof-ride-meta-item">
                      <span className="prof-ride-meta-lbl">Returned</span>
                      <span className="prof-ride-meta-val">{ride.returnHub || "—"}</span>
                    </div>
                    <div className="prof-ride-meta-item prof-ride-meta-right">
                      <span className="prof-ride-meta-lbl">Duration</span>
                      <span className="prof-ride-meta-val">{fmtDur(ride.hours, ride.minutes)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;