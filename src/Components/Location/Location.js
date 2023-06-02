import React from "react";
import './Location.css';
import Map from "../Map/Map";

function Location()
{
    return(
        <div className="App">
            <Map/>
            <button className="button"> Proceed to book </button>
        </div>
    );
}

export default Location;
