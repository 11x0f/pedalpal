import React, { useState } from "react";
import "./UserForm.css";
import Header from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {

const { id } = useParams();

const navigate = useNavigate();

const [name, setName] = useState("");

const [phoneNumber, setPhoneNumber] =
useState("");

const [hours, setHours] = useState(0);

const [minutes, setMinutes] = useState(0);

const [paymentMethod, setPaymentMethod] =
useState("");

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

setHours(hours + 1);

}
else {

setMinutes(minutes + 1);

}

};

const handleMinutesSubtract = () => {

if (minutes === 0) {

if (hours > 0) {

setMinutes(59);

setHours(hours - 1);

}

}
else {

setMinutes(minutes - 1);

}

};

const handleSubmit = (e) => {

e.preventDefault();

navigate(
`/payment/${id}/${name}/${phoneNumber}/${hours}/${minutes}/${paymentMethod}`
);

};

return (

<div>

<Header/>

<div className="booking-page">

<div className="booking-card">

<div className="booking-left">

<h1>
Complete Your Booking
</h1>

<p>
Fill in your details to unlock your ride.
</p>

<form onSubmit={handleSubmit}>

<div className="form-group">

<label>
Full Name
</label>

<input
type="text"
value={name}
onChange={(e)=>
setName(e.target.value)
}
required
placeholder="Enter your name"
/>

</div>

<div className="form-group">

<label>
Phone Number
</label>

<input
type="tel"
value={phoneNumber}
onChange={(e)=>
setPhoneNumber(
e.target.value
)
}
required
placeholder="Enter phone number"
/>

</div>

<div className="form-group">

<label>
Rental Duration
</label>

<div className="time-controls">

<div className="time-box">

<button
type="button"
onClick={handleHoursSubtract}
>
−
</button>

<span>
{hours} hrs
</span>

<button
type="button"
onClick={handleHoursAdd}
>
+
</button>

</div>

<div className="time-box">

<button
type="button"
onClick={handleMinutesSubtract}
>
−
</button>

<span>
{minutes} mins
</span>

<button
type="button"
onClick={handleMinutesAdd}
>
+
</button>

</div>

</div>

</div>

<div className="form-group">

<label>
Payment Method
</label>

<select
value={paymentMethod}
onChange={(e)=>
setPaymentMethod(
e.target.value
)
}
required
>

<option value="">
Select Payment Method
</option>

<option value="upi">
UPI
</option>

<option value="card">
Card
</option>

<option value="netbanking">
Net Banking
</option>

</select>

</div>

<button
type="submit"
className="submit-btn"
>

Continue to Payment

</button>

</form>

</div>

<div className="booking-right">

<div className="summary-card">

<h2>
Ride Summary
</h2>

<div className="summary-item">

<span>Cycle ID</span>

<strong>
#{id}
</strong>

</div>

<div className="summary-item">

<span>Duration</span>

<strong>
{hours}h {minutes}m
</strong>

</div>

<div className="summary-item">

<span>Payment</span>

<strong>
{paymentMethod || "Not Selected"}
</strong>

</div>

<div className="divider"></div>

<div className="eco-box">

🌱 Eco Friendly Ride

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default UserForm;