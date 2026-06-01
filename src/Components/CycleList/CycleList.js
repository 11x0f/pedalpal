import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "./CycleList.css";

function CycleList() {

const navigate = useNavigate();

const [cyclesData, setCyclesData] = useState([]);

const { id } = useParams();

const phonenum = sessionStorage.getItem("phoneNumber");

useEffect(() => {

if (phonenum === null) {
navigate("/");
}

}, [navigate, phonenum]);

useEffect(() => {

const storedCycles =
localStorage.getItem("cycles");

if (storedCycles) {

setCyclesData(
JSON.parse(storedCycles)
);

}

}, []);

const handleRentClick = (id) => {

navigate(`/userdetails/${id}`);

};

const filteredCycles =
cyclesData.filter(

(cycle)=>

cycle.position.toLowerCase() ===
id.toLowerCase() &&

!cycle.isBooked

);

return (

<div className="cycle-page">

<Header/>

<div className="cycle-container">

<div className="page-header">

<h1>
Available Cycles
</h1>

<p>
Choose your next eco-friendly ride at
<strong> {id}</strong>
</p>

</div>

<div className="cycle-grid">

{
filteredCycles.length > 0 ?

filteredCycles.map((cycle)=>(

<div
className="cycle-card"
key={cycle.id}
>

<div className="card-top">

<div className="cycle-id">

#{cycle.id}

</div>

<div className="status-badge">

Available

</div>

</div>

<div className="cycle-model">

🚲 {cycle.model}

</div>

<div className="cycle-price">

₹{cycle.price}

<span>/hour</span>

</div>

<div className="cycle-location">

📍 {cycle.position}

</div>

<button
className="rent-btn"
onClick={()=>
handleRentClick(cycle.id)
}
>
Rent Now
</button>

</div>

))

:

<div className="empty-state">

<h2>
No cycles available
</h2>

<p>
Try another hub or
check again later.
</p>

</div>

}

</div>

</div>

</div>

);

}

export default CycleList;