// UserForm.js

import React, { useState } from 'react';
import './UserForm.css';
import Header from '../Header/Header';
import { useNavigate, useParams } from 'react-router-dom';


const UserForm = () => {
  const {id} = useParams();
  /* console.log(id); */
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  const [formData, setFormData] = useState({
        name :' ',
        phoneNumber:' ',
        hours:' ',
        minutes:' ',
        paymentMethod:' ',
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleHoursAdd = () => {
    setHours(hours + 1);
  };

  const handleHoursSubtract = () => {
    if (hours > 0) {
      setHours(hours - 1);
    }
  };

  const handleMinutesAdd = () => {
    if (minutes === 59) {
      setMinutes(0);
      handleHoursAdd();
    } else {
      setMinutes(minutes + 1);
    }
  };

  const handleMinutesSubtract = () => {
    if (minutes === 0) {
      if (hours > 0) {
        setMinutes(59);
        handleHoursSubtract();
      }
    } else {
      setMinutes(minutes - 1);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission

    /* console.log('Form submitted:', {
      name,
      phoneNumber,
      hours,
      minutes,
      paymentMethod,
    }); */

    
    
   
      const Bid = id; // Assign the value of id to Bid variable
      const paramPhone = phoneNumber;
      navigate(`/payment/${Bid}/${name}/${paramPhone}/${hours}/${minutes}/${paymentMethod}`);
      /* console.log("bid asdf :", Bid); */
    
    
    /* const Bid = id;
    navigate(`/payment/${Bid}/${name}/${phoneNumber}/${hours}/${minutes}/${paymentMethod}`); */
    /* navigate(`/userdetails/${id}`); */
  };
  const navigate = useNavigate();
  return (
    <div>
        <Header/>
        <div className="user-form">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time to Rent Cycle:</label>
          <div className="time-control">
            <button type="button" onClick={handleHoursSubtract}>-</button>
            <span>{hours} hours</span>
            <button type="button" onClick={handleHoursAdd}>+</button>
            <button type="button" onClick={handleMinutesSubtract}>-</button>
            <span>{minutes} minutes</span>
            <button type="button" onClick={handleMinutesAdd}>+</button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>

    </div>
    </div>
    
  );
}

export default UserForm;
