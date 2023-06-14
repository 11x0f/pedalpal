import React from "react";
import './Location.css';
import Map from "../Map/Map";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function onProceed(navigate)
{
    navigate('/hub')
}

function Location()
{
    let navigate = useNavigate();
    return(
        <div>
            <Header/>
            <div className="App">
            <Map/>
            <button onClick={()=>onProceed(navigate)} className="button"> Proceed to book </button>
        </div>
        </div>
        
    );
}

export default Location;
