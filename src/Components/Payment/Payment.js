import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Payment.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Payment = ({ id,name, phoneNumber }) => {
  const { Bid,  paymentMethod, hours, minutes ,paramPhone} = useParams();


  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankName, setBankName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cardType, setCardType] = useState('');
  const [paymentCompany, setPaymentCompany] = useState('');
  const [cyclesData, setCyclesData] = useState([]);

  const amountToBePaid = 2 * hours + 0.01 * minutes;

  const navigate = useNavigate();

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
  };
  const handleCardNoChange = (e) => {
    setCardNo(e.target.value);
  };
  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };
  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };
  const handleBankNameChange = (e) => {
    setBankName(e.target.value);
  };

  const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the payment data
    /* console.log('Payment submitted:', {
      id,
      name,
      phoneNumber,
      paymentMethod,
      hours,
      minutes,
      nameOnCard,
      cardNo,
      expirationDate,
      cvv,
      bankName,
      upiId,
      username,
      password,
      cardType,
      paymentCompany,
    }); */
    // Reset form fields
      setNameOnCard('');
      setCardNo('');
      setExpirationDate('');
      setCvv('');
      setBankName('');
      setUpiId('');
      setUsername('');
      setPassword('');

      const cycles1 = cyclesData.map((cycle) => {
        if (cycle.id === Number(Bid)) {
          return { ...cycle, isBooked: true };
        } else {
          return cycle;
        }
      });

      /* console.log(cycles1); */
      
      localStorage.removeItem('cycles');

      localStorage.setItem('cycles', JSON.stringify(cycles1));

      navigate(`/checkout/${Bid}/${paramPhone}`)
      

  };


  const phonenum = sessionStorage.getItem("phoneNumber");


  useEffect( ()=>{
      if(phonenum === null)
  {
      navigate("/");
      
      return ;
  }
  },[]);


  useEffect(() => {
    const storedCycles = localStorage.getItem('cycles');
    if (storedCycles) {
      setCyclesData(JSON.parse(storedCycles));
    }
  }, []);
  

  /* console.log(cyclesData); */

  /* console.log(cyclesData); */

  return (
    <div>
      <Header/>

      <marquee> Your phone number and name will be stored in database till the time you return the cycle </marquee>
      <div className="payment-form">
      <h2>Payment Details</h2>
      <div>Amount to be paid: ₹ {amountToBePaid}</div>
      <form onSubmit={handleSubmit}>
        {/* Form fields based on payment method */}
        {paymentMethod === 'card' && (
          <>
            {/* Card payment fields */}
            <label htmlFor="nameOnCard">Name on Card:</label>
            <input
              type="text"
              id="nameOnCard"
              value={nameOnCard}
              onChange={handleNameOnCardChange}
              required
            />

            <label htmlFor="cardNo">Card Number:</label>
            <input
              type="text"
              id="cardNo"
              value={cardNo}
              onChange={handleCardNoChange}
              required
            />

            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              value={expirationDate}
              onChange={handleExpirationDateChange}
              required
            />

            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              required
            />

            <label htmlFor="cardType">Card Type:</label>
            <select
              id="cardType"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="">Select Card Type</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>

            <label htmlFor="paymentCompany">Payment Processing Company:</label>
            <select
              id="paymentCompany"
              value={paymentCompany}
              onChange={(e) => setPaymentCompany(e.target.value)}
            >
              <option value=""> Select </option>
              <option value="MasterCard"> MasterCard </option>
              <option value="Visa"> Visa </option>
              <option value="RuPay"> RuPay </option>
            </select>
          </>
        )}

        {paymentMethod === 'upi' && (
          <>
            {/* UPI payment fields */}
            <label htmlFor="bankName">Bank Name:</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={handleBankNameChange}
              required
            />

            <label htmlFor="upiId">UPI ID:</label>
            <input
              type="text"
              id="upiId"
              value={upiId}
              onChange={handleUpiIdChange}
              required
            />
          </>
        )}

        {paymentMethod === 'netbanking' && (
          <>
            {/* Netbanking payment fields */}
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            <label htmlFor="bankName">Bank Name:</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={handleBankNameChange}
              required
            />
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Payment;