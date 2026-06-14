import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./UserForm.css";

function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cycle, setCycle] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem("phoneNumber")) navigate("/");
    const stored = localStorage.getItem("cycles");
    if (stored) {
      const found = JSON.parse(stored).find((c) => c.id === Number(id));
      setCycle(found || null);
    }
  }, [navigate, id]);

  const adjustHours = (delta) => setHours((h) => Math.max(0, h + delta));

  const adjustMinutes = (delta) => {
    let m = minutes + delta;
    if (m >= 60) { m = 0; setHours((h) => h + 1); }
    else if (m < 0) { if (hours > 0) { m = 59; setHours((h) => h - 1); } else m = 0; }
    setMinutes(m);
  };

  const totalAmount = cycle
    ? (cycle.price * hours + (cycle.price / 60) * minutes).toFixed(2)
    : "0.00";

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/payment/${id}/${name}/${phone}/${hours}/${minutes}/${paymentMethod}`);
  };

  const PAYMENT_OPTIONS = [
    { value: "upi", label: "UPI" },
    { value: "card", label: "Card" },
    { value: "netbanking", label: "Net Banking" },
  ];

  return (
    <div>
      <Header />
      <div className="uf-page">

        <div className="uf-left">
          <Link to={`/cyclelist/${cycle?.position || ""}`} className="uf-back">← Back</Link>
          <p className="uf-eyebrow">Step 3 of 3</p>
          <h1 className="uf-title">Complete your booking</h1>
          <p className="uf-sub">Fill in your details to unlock the ride.</p>

          <form className="uf-form" onSubmit={handleSubmit}>

            <div className="uf-section-label">Your details</div>

            <div className="uf-field">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="uf-field">
              <label>Phone number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="uf-section-label" style={{ marginTop: "28px" }}>Rental duration</div>

            <div className="uf-time-row">
              <div className="uf-time-unit">
                <button type="button" className="uf-time-btn" onClick={() => adjustHours(-1)}>−</button>
                <div className="uf-time-val">
                  <span className="uf-time-num">{hours}</span>
                  <span className="uf-time-lbl">hrs</span>
                </div>
                <button type="button" className="uf-time-btn" onClick={() => adjustHours(1)}>+</button>
              </div>

              <div className="uf-time-sep">:</div>

              <div className="uf-time-unit">
                <button type="button" className="uf-time-btn" onClick={() => adjustMinutes(-1)}>−</button>
                <div className="uf-time-val">
                  <span className="uf-time-num">{String(minutes).padStart(2, "0")}</span>
                  <span className="uf-time-lbl">mins</span>
                </div>
                <button type="button" className="uf-time-btn" onClick={() => adjustMinutes(1)}>+</button>
              </div>
            </div>

            <div className="uf-section-label" style={{ marginTop: "28px" }}>Payment method</div>

            <div className="uf-pay-row">
              {PAYMENT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`uf-pay-opt${paymentMethod === opt.value ? " uf-pay-opt--active" : ""}`}
                  onClick={() => setPaymentMethod(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button type="submit" className="uf-submit" disabled={!paymentMethod}>
              Continue to payment →
            </button>
          </form>
        </div>

        <div className="uf-right">
          <div className="uf-summary">
            <p className="uf-summary-title">Ride summary</p>

            <div className="uf-summary-row">
              <span>Bike</span>
              <strong>#{id}</strong>
            </div>
            {cycle && (
              <div className="uf-summary-row">
                <span>Type</span>
                <strong>{cycle.model}</strong>
              </div>
            )}
            {cycle && (
              <div className="uf-summary-row">
                <span>Hub</span>
                <strong>{cycle.position}</strong>
              </div>
            )}
            <div className="uf-summary-row">
              <span>Duration</span>
              <strong>{hours}h {String(minutes).padStart(2, "0")}m</strong>
            </div>
            <div className="uf-summary-row">
              <span>Rate</span>
              <strong>₹{cycle?.price ?? "—"}/hr</strong>
            </div>

            <div className="uf-summary-divider" />

            <div className="uf-total-row">
              <span>Total</span>
              <strong className="uf-total">₹{totalAmount}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserForm;