import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Tracker.css";

function Tracker() {
  const navigate = useNavigate();
  const phone = sessionStorage.getItem("phoneNumber");
  const [ride, setRide] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!phone) navigate("/");
    const history = JSON.parse(localStorage.getItem("rideHistory") || "[]");
    const active = history.find((r) => r.phone === phone && r.status === "active");
    setRide(active || null);
  }, [phone, navigate]);

  useEffect(() => {
    if (!ride) return;
    const start = new Date(ride.date).getTime();
    const tick = () => setElapsed(Math.floor((Date.now() - start) / 1000));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [ride]);

  const fmt = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0"));
  };

  const bookedSecs = ride ? ride.hours * 3600 + ride.minutes * 60 : 0;
  const overTime = elapsed > bookedSecs && bookedSecs > 0;
  const progress = bookedSecs > 0 ? Math.min(elapsed / bookedSecs, 1) : 0;
  const [hh, mm, ss] = fmt(elapsed);

  const startTime = ride
    ? new Date(ride.date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    : "—";
  const startDate = ride
    ? new Date(ride.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    : "—";

  return (
    <div>
      <Header />

      <div className="tracker-page">

        {!ride ? (
          <div className="tracker-empty">
            <p className="tracker-empty-icon">🚲</p>
            <h2>No active ride</h2>
            <p>You don't have a bike booked right now.</p>
            <Link to="/hub" className="tracker-empty-link">Book a bike →</Link>
          </div>
        ) : (
          <div className="tracker-card">

            <div className="tracker-top">
              <p className="tracker-eyebrow">Active ride</p>
              <h1 className="tracker-bike">
                Bike #{ride.bikeId} · {ride.bikeModel}
              </h1>
              <p className="tracker-hub">
                Picked up from <strong>{ride.pickupHub}</strong> · {startDate} at {startTime}
              </p>
            </div>

            {/* Timer */}
            <div className={`tracker-timer${overTime ? " tracker-timer--over" : ""}`}>
              <div className="tracker-digits">
                <div className="tracker-digit-group">
                  <span className="tracker-digit">{hh}</span>
                  <span className="tracker-digit-lbl">hrs</span>
                </div>
                <span className="tracker-colon">:</span>
                <div className="tracker-digit-group">
                  <span className="tracker-digit">{mm}</span>
                  <span className="tracker-digit-lbl">min</span>
                </div>
                <span className="tracker-colon">:</span>
                <div className="tracker-digit-group">
                  <span className="tracker-digit">{ss}</span>
                  <span className="tracker-digit-lbl">sec</span>
                </div>
              </div>
              <p className="tracker-timer-label">
                {overTime ? "⚠ Over your booked duration" : "Time elapsed"}
              </p>
            </div>

            {/* Progress bar */}
            {bookedSecs > 0 && (
              <div className="tracker-progress-wrap">
                <div className="tracker-progress-bar">
                  <div
                    className={`tracker-progress-fill${overTime ? " tracker-progress-fill--over" : ""}`}
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="tracker-progress-labels">
                  <span>0:00</span>
                  <span>
                    Booked: {String(ride.hours).padStart(2, "0")}h {String(ride.minutes).padStart(2, "0")}m
                  </span>
                </div>
              </div>
            )}

            {/* Ride details */}
            <div className="tracker-details">
              <div className="tracker-detail-row">
                <span>Booked duration</span>
                <strong>{ride.hours}h {String(ride.minutes).padStart(2, "0")}m</strong>
              </div>
              <div className="tracker-detail-row">
                <span>Amount paid</span>
                <strong>₹{ride.amount?.toFixed(2)}</strong>
              </div>
              <div className="tracker-detail-row">
                <span>Payment method</span>
                <strong style={{ textTransform: "capitalize" }}>{ride.paymentMethod}</strong>
              </div>
              <div className="tracker-detail-row">
                <span>Return ID</span>
                <strong className="tracker-mono">{ride.uniqueId}</strong>
              </div>
            </div>

            <Link to="/returnForm" className="tracker-return-btn">
              Return this bike →
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}

export default Tracker;