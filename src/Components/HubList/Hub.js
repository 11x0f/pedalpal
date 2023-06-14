import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hub.css'; // Import the CSS file
import Header from '../Header/Header';

function Hub () 
 {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

 
    const navigateToCycleList = () => {
        navigate(`/cyclelist/${selectedOption}`);
      };
      

  return (
    <div>
      <Header />
      <div className="hub-container">
        <h1 className="hub-title">SELECT THE CLOSEST HUB</h1>
        <select className="hub-select" value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="railway">Railway Station</option>
          <option value="airport">Airport</option>
          <option value="lulumall">Lulu Mall</option>
        </select>
        <button className="hub-button" onClick={navigateToCycleList(selectedOption)}> Go to CycleList </button>
      </div>
    </div>
  );
};

export default Hub;


/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hub.css'; // Import the CSS file
import Header from '../Header/Header';

const Hub = () => {
  const navigate = useNavigate();
  const [hub, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const navigateToCycleList = () => {
    console.log(hub);
    navigate(`/cyclelist/${hub}`);
    console.log(hub);
  };

  return (
    <div>
        <Header/>
        <div className="hub-container">
      <h1 className="hub-title"> SELECT THE CLOSEST HUB </h1>
      <select className="hub-select" value={Hub} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="railway">Railway Station</option>
        <option value="airport">Airport</option>
        <option value="lulumall">Lulu Mall</option>
      </select>
      <button className="hub-button" onClick={navigateToCycleList} > Go to CycleList </button>
    </div>
    </div>
    
  );
};

export default Hub; */
