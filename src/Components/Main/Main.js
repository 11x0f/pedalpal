import React from 'react';
import './Main.css';
import logo from './logo.jpg';
import { useNavigate } from 'react-router-dom';

function onProceed(navigate)
{
    navigate('/map')
}

function Main()
{
    let navigate = useNavigate();
    return (
        <div className="main">
            <h1> PEDAL PAL </h1>
            <img src={logo} alt="logo" />
            <div className="demoImages">
                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOmq8bVhD5CdWNgtmLiaLeTYPWtEkeiPq9iA&usqp=CAU" alt="cycle 1"/>
                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkBdkYOxRhaXrSpicEyVxMudHZEPC6Xv3lgg&usqp=CAU" alt="cycle 2"/>
                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXKSMWpHcp-yOevsFpP0aqSwZUHv8eq3MHuQ&usqp=CAU" alt="cycle 3"/>
                
            </div>
            <button onClick={()=>onProceed(navigate)}> PROCEED </button>

        </div>
    )

}

export default Main;