import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "./Checkout.css";

function Checkout() {

const navigate = useNavigate();

const { Bid, paramPhone } = useParams();

const cyclesData =
JSON.parse(
localStorage.getItem("cycles")
) || [];

const existingData =
localStorage.getItem(
"customerData"
);

const customerData =
existingData
? JSON.parse(existingData)
: [];

const newCustomer = {

phoneNumber:paramPhone,

uniqueId:
cyclesData[Bid-1]?.unqId

};

const alreadyExists =
customerData.some(

(customer)=>

customer.phoneNumber ===
paramPhone

&&

customer.uniqueId ===
cyclesData[Bid-1]?.unqId

);

if(!alreadyExists){

customerData.push(
newCustomer
);

localStorage.setItem(

"customerData",

JSON.stringify(
customerData
)

);

}

const handleRedirect=()=>{

navigate("/");

};

return (

<div>

<Header/>

<div className="checkout-page">

<div className="success-card">

<div className="success-icon">

✓

</div>

<h1>

Booking Confirmed!

</h1>

<p>

Your cycle has been successfully booked.

</p>

<div className="summary-card">

<div className="summary-row">

<span>
Cycle ID
</span>

<strong>

#{Bid}

</strong>

</div>

<div className="summary-row">

<span>
Phone Number
</span>

<strong>

{paramPhone}

</strong>

</div>

</div>

<div className="unique-id-box">

<div className="label">

Return ID

</div>

<div className="unique-id">

{
cyclesData[
Bid-1
]?.unqId
}

</div>

<p>

Save this ID securely.
You will need it
when returning
your cycle.

</p>

</div>

<button
className="home-btn"
onClick={handleRedirect}
>

Return Home

</button>

</div>

</div>

</div>

);

}

export default Checkout;