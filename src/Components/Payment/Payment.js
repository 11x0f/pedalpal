import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const { Bid, paymentMethod, hours, minutes, paramPhone } = useParams();

  const [cyclesData, setCyclesData] = useState([]);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardCompany, setCardCompany] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [nbUser, setNbUser] = useState("");
  const [nbPass, setNbPass] = useState("");

  const cycle = cyclesData.find((c) => c.id === Number(Bid));
  const amount = cycle
    ? (cycle.price * Number(hours) + (cycle.price / 60) * Number(minutes)).toFixed(2)
    : (2 * Number(hours) + 0.01 * Number(minutes)).toFixed(2);

  useEffect(() => {
    if (!sessionStorage.getItem("phoneNumber")) navigate("/");
    const stored = localStorage.getItem("cycles");
    if (stored) setCyclesData(JSON.parse(stored));
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark cycle as booked
    const updated = cyclesData.map((c) =>
      c.id === Number(Bid) ? { ...c, isBooked: true } : c
    );
    localStorage.setItem("cycles", JSON.stringify(updated));

    // Save ride record to history
    const phone = sessionStorage.getItem("phoneNumber");
    const rideRecord = {
      id: Date.now(),
      bikeId: Bid,
      bikeModel: cycle?.model || "—",
      pickupHub: cycle?.position || "—",
      returnHub: null,
      hours: Number(hours),
      minutes: Number(minutes),
      amount: parseFloat(amount),
      paymentMethod,
      phone,
      uniqueId: cycle?.unqId,
      date: new Date().toISOString(),
      status: "active",
    };

    const history = JSON.parse(localStorage.getItem("rideHistory") || "[]");
    history.unshift(rideRecord);
    localStorage.setItem("rideHistory", JSON.stringify(history));

    navigate(`/checkout/${Bid}/${paramPhone}`);
  };

  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  return (
    <div>
      <Header />
      <div className="pay-page">

        <div className="pay-left">
          <Link to={`/userdetails/${Bid}`} className="pay-back">← Back</Link>
          <p className="pay-eyebrow">Almost there</p>
          <h1 className="pay-title">Payment details</h1>
          <p className="pay-sub">Complete payment to unlock your ride.</p>

          <div className="pay-secure">
            🔒 Your information is encrypted and stored securely.
          </div>

          <form className="pay-form" onSubmit={handleSubmit}>

            {paymentMethod === "upi" && (
              <>
                <div className="pay-field">
                  <label>Bank name</label>
                  <input type="text" placeholder="e.g. State Bank of India"
                    value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                </div>
                <div className="pay-field">
                  <label>UPI ID</label>
                  <input type="text" placeholder="yourname@upi"
                    value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
                </div>
              </>
            )}

            {paymentMethod === "card" && (
              <>
                <div className="pay-field">
                  <label>Name on card</label>
                  <input type="text" placeholder="As it appears on card"
                    value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} required />
                </div>
                <div className="pay-field">
                  <label>Card number</label>
                  <input type="text" placeholder="•••• •••• •••• ••••"
                    value={cardNo}
                    onChange={(e) => setCardNo(formatCard(e.target.value))}
                    maxLength={19} required />
                </div>
                <div className="pay-split">
                  <div className="pay-field">
                    <label>Expiry</label>
                    <input type="text" placeholder="MM/YY"
                      value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
                  </div>
                  <div className="pay-field">
                    <label>CVV</label>
                    <input type="password" placeholder="•••"
                      value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength={4} required />
                  </div>
                </div>
                <div className="pay-split">
                  <div className="pay-field">
                    <label>Card type</label>
                    <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
                      <option value="">Select</option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>
                  <div className="pay-field">
                    <label>Network</label>
                    <select value={cardCompany} onChange={(e) => setCardCompany(e.target.value)}>
                      <option value="">Select</option>
                      <option value="Visa">Visa</option>
                      <option value="RuPay">RuPay</option>
                      <option value="MasterCard">Mastercard</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {paymentMethod === "netbanking" && (
              <>
                <div className="pay-field">
                  <label>Bank name</label>
                  <input type="text" placeholder="Your bank"
                    value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                </div>
                <div className="pay-field">
                  <label>Username</label>
                  <input type="text"
                    value={nbUser} onChange={(e) => setNbUser(e.target.value)} required />
                </div>
                <div className="pay-field">
                  <label>Password</label>
                  <input type="password"
                    value={nbPass} onChange={(e) => setNbPass(e.target.value)} required />
                </div>
              </>
            )}

            <button type="submit" className="pay-submit">
              Pay ₹{amount}
            </button>
          </form>
        </div>

        <div className="pay-right">
          <div className="pay-summary">
            <p className="pay-summary-title">Booking summary</p>
            <div className="pay-summary-row">
              <span>Bike</span>
              <strong>#{Bid}</strong>
            </div>
            <div className="pay-summary-row">
              <span>Duration</span>
              <strong>{hours}h {String(minutes).padStart(2, "0")}m</strong>
            </div>
            <div className="pay-summary-row">
              <span>Method</span>
              <strong style={{ textTransform: "capitalize" }}>{paymentMethod}</strong>
            </div>
            <div className="pay-summary-divider" />
            <div className="pay-summary-total-row">
              <span>Total</span>
              <strong className="pay-summary-total">₹{amount}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Payment;