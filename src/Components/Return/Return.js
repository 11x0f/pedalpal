import React from 'react';
import './Return.css';
import Header from '../Header/Header';
import { useNavigate, useParams } from 'react-router-dom';

function BikeReturnMessage() {
  const navigate = useNavigate();
  const {phoneNumber,uniqueId,rlocation,} = useParams();

  function returnToHome() {
    // Logic to handle returning to the home page
    // You can use React Router or implement your own logic here

    //getting customer data
    const existingCustomers = JSON.parse(localStorage.getItem('customerData'));
    console.log(existingCustomers);
    console.log(phoneNumber);
    console.log(uniqueId);
    console.log(rlocation);

    //pop customers 
    const filteredData = existingCustomers.filter(
      (customer) =>
        customer.phoneNumber !== phoneNumber || customer.uniqueId !== uniqueId
    );

    console.log(filteredData);

    if(filteredData !== []){
      const updatedData = JSON.stringify(filteredData);
      localStorage.setItem('customerData',updatedData);
    }

    //modify cycles
    const existingState = JSON.parse(localStorage.getItem('cycles'));
    console.log("initial: ",existingState);
    localStorage.removeItem('cycles');


    console.log(rlocation);
    const updatedState = existingState.map((cycle) => {
      if (cycle.unqId === uniqueId) {
        return {
          ...cycle,
          isBooked: false,
          position: rlocation,
        };
      }
      return cycle;
    }
  )

  console.log("middle: ",updatedState);

  const cycles = JSON.stringify(updatedState);
  console.log("Final:",cycles);
  localStorage.setItem('cycles',cycles);

    /* navigate('/home'); */
  }

  return (
    <div>
      <Header/>
      <div className="message-box">
      <div className="message">Bike successfully returned!</div>
      <button className="button" onClick={returnToHome}> Return to Home </button>
    </div>
    </div>
    
  );
}

export default BikeReturnMessage;
