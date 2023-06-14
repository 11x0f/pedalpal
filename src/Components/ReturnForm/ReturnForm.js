import React, { useState } from 'react';
import './ReturnForm.css'; // Import CSS file for styling
import Header from '../Header/Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ReturnForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uniqueKey, setUniqueKey] = useState('');
  const [rLocation, setRLocation] = useState('');

  const phoneNum = sessionStorage.getItem('phoneNumber');
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleUniqueKeyChange = (e) => {
    setUniqueKey(e.target.value);
  };

  const handleReturnHubChange = (e) => {
    setRLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/return/${phoneNumber}/${uniqueKey}/${rLocation}`);
  };

  useEffect(() => {
    if (phoneNum === null) {
      navigate('/');
      return;
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label">Phone Number:</label>
          <input
            className="form-input"
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />

          <label className="form-label">Unique Key:</label>
          <input
            className="form-input"
            type="text"
            value={uniqueKey}
            onChange={handleUniqueKeyChange}
          />

          <label className="form-label">Return Hub:</label>
          <select
            id="paymentMethod"
            value={rLocation}
            onChange={handleReturnHubChange}
            required
          >
            <option value="">Select Return Location</option>
            <option value="Railway">Railway Station</option>
            <option value="Airport">Airport</option>
            <option value="Lulu Mall">Lulu Mall</option>
          </select>

          <button className="form-button" type="submit">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnForm;


/* function ReturnForm = ({ }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uniqueKey, setUniqueKey] = useState('');
  const [rLocation,setRLocation] = useState('');

  const phonenum = sessionStorage.getItem("phoneNumber");

  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleUniqueKeyChange = (e) => {
    setUniqueKey(e.target.value);
  };

  const handleReturnHubChange  = (e) => {
    setRLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/return/${phoneNumber}/${uniqueKey}/${rLocation}`);

 /*    // Validation and further processing logic
    if (phoneNumber && uniqueKey) {
      onNext(); // Proceed to next page or perform necessary actions
    }
  }; */
  
 /*  useEffect( ()=>{
    if(phoneNum === null)
{
    navigate("/");
    
    return ;
}
},[])

  return (
    <div>
      <Header/>
      <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">Phone Number:</label>
        <input
          className="form-input"
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />

        <label className="form-label">Unique Key:</label>
        <input
          className="form-input"
          type="text"
          value={uniqueKey}
          onChange={handleUniqueKeyChange}
        />

        <label className="form-label">Return Hub:</label>
        <select
            id="paymentMethod"
            value={rLocation}
            onChange={handleReturnHubChange}
            required
          >
            <option value="">Select Return Location </option>
            <option value="Railway"> Railway Station </option>
            <option value="Airport"> Airport </option>
            <option value="Lulu Mall"> Lulu Mall </option>
          </select>

        <button className="form-button" type="submit"> Proceed </button>
      </form>
    </div>
    </div>
  );
};

export default ReturnForm;
 */ 