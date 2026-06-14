import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./ReturnForm.css";

const HUBS = [
  { value: "Railway",     label: "Kannur Railway Station" },
  { value: "Airport",     label: "Kannur International Airport" },
  { value: "Lulu Mall",   label: "Lulu Mall" },
  { value: "Payyambalam", label: "Payyambalam Beach" },
];

function ReturnForm() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [hub, setHub] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("phoneNumber")) navigate("/");
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const customers = JSON.parse(localStorage.getItem("customerData") || "[]");
    const match = customers.find(
      (c) => c.phoneNumber === phone && c.uniqueId === uniqueKey
    );
    if (!match) {
      setError("No booking found with those details. Check your Return ID.");
      return;
    }
    setError("");
    navigate(`/return/${phone}/${uniqueKey}/${hub}`);
  };

  return (
    <div>
      <Header />

      <div className="rf-page">
        <div className="rf-card">

          <h1 className="rf-title">Return your bike</h1>
          <p className="rf-sub">Enter your booking details to complete the return.</p>

          {error && <div className="rf-error">{error}</div>}

          <form className="rf-form" onSubmit={handleSubmit}>
            <div className="rf-field">
              <label>Phone number</label>
              <input
                type="tel"
                placeholder="The number used to book"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="rf-field">
              <label>Return ID</label>
              <input
                type="text"
                placeholder="e.g. stu901"
                value={uniqueKey}
                onChange={(e) => setUniqueKey(e.target.value)}
                required
              />
              <p className="rf-field-hint">Found on your booking confirmation.</p>
            </div>

            <div className="rf-field">
              <label>Return hub</label>
              <div className="rf-hub-grid">
                {HUBS.map((h) => (
                  <button
                    key={h.value}
                    type="button"
                    className={`rf-hub-btn${hub === h.value ? " rf-hub-btn--active" : ""}`}
                    onClick={() => setHub(h.value)}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="rf-submit" disabled={!hub}>
              Confirm return →
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default ReturnForm;