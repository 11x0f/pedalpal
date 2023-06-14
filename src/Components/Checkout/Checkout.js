import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Checkout.css'; // Import CSS file for styling
import Header from '../Header/Header';
import { useState, useEffect } from 'react';

const Checkout = () => {
  const navigate = useNavigate();
  const {Bid, paramPhone} = useParams();

  /* const [cyclesData, setCyclesData] = useState([]);
  useEffect(() => {
    const storedCycles = localStorage.getItem('cycles');
    if (storedCycles) {
      setCyclesData(JSON.parse(storedCycles));
    }
  }, []); */
  const cyclesData = JSON.parse(localStorage.getItem('cycles'));


  // Check if data already exists in local storage
const existingData = localStorage.getItem('customerData');
// Parse the existing data as JSON or create an empty array if no data exists
const customerData = existingData ? JSON.parse(existingData) : [];
// Assigning values for phoneNumber, uniqueId, and customerName
const newCustomer = {
  phoneNumber: paramPhone,
  uniqueId: cyclesData[Bid-1].unqId,
  /* name:  */
};
// Add the new customer to the data array
customerData.push(newCustomer);
const updatedData = JSON.stringify(customerData);
localStorage.setItem('customerData', updatedData);






  const handleRedirect = () => {
    /* console.log(paramPhone,cyclesData[Bid].unqId) */
    navigate('/'); 
  };

  return (
    <div>
        <Header/>
        <div className="checkout-container">
      <h2 className="checkout-heading">Thank you for your purchase!</h2>
      <p className="checkout-information"> Save this unique id for return purpose : {cyclesData[Bid-1].unqId} </p>
      <button className="redirect-button" onClick={handleRedirect}>
        Go to Home Page
      </button>
    </div>
    </div>
    
  );
};

export default Checkout;
