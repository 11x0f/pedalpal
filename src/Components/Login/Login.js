import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpHint, setOtpHint] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("phoneNumber")) {
      navigate("/home");
    }
  }, [navigate]);

  const sendOtp = () => {
    if (!phone.trim()) {
      setError("Enter your phone number first.");
      return;
    }
    setError("");
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setOtpHint("Demo OTP: " + otp);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone.trim()) { setError("Please enter your phone number."); return; }
    if (!generatedOtp)  { setError("Request an OTP first."); return; }
    if (otpInput !== generatedOtp) { setError("Incorrect OTP — please try again."); return; }
    sessionStorage.setItem("phoneNumber", phone);
    navigate("/home");
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <img src={logo} alt="PedalPal" className="login-logo" />

        <h1 className="login-heading">Log in to your account</h1>
        <p className="login-sub">Enter your phone number to receive a one-time password.</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label>Phone number</label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>One-time password</label>
            <div className="login-otp-row">
              <input
                type="text"
                placeholder="6-digit OTP"
                maxLength={6}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
              <button type="button" className="login-otp-btn" onClick={sendOtp}>
                Send OTP
              </button>
            </div>
            {otpHint && <p className="login-otp-hint">{otpHint}</p>}
          </div>

          <hr className="login-divider" />

          <button type="submit" className="login-submit">
            Continue
          </button>
        </form>

        <p className="login-footer">
          By continuing you agree to PedalPal's terms of service.
        </p>
      </div>
    </div>
  );
}

export default Login;