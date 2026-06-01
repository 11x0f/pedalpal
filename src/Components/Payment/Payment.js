import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Payment.css";

function Payment() {

const navigate = useNavigate();

const {
Bid,
paymentMethod,
hours,
minutes,
paramPhone
} = useParams();

const [cyclesData,setCyclesData] =
useState([]);

const [nameOnCard,setNameOnCard] =
useState("");

const [cardNo,setCardNo] =
useState("");

const [expirationDate,setExpirationDate] =
useState("");

const [cvv,setCvv] =
useState("");

const [bankName,setBankName] =
useState("");

const [upiId,setUpiId] =
useState("");

const [username,setUsername] =
useState("");

const [password,setPassword] =
useState("");

const [cardType,setCardType] =
useState("");

const [paymentCompany,setPaymentCompany] =
useState("");

const amountToBePaid =
2 * Number(hours)
+
0.01 * Number(minutes);

const phonenum =
sessionStorage.getItem(
"phoneNumber"
);

useEffect(()=>{

if(phonenum===null){

navigate("/");

}

},[navigate,phonenum]);

useEffect(()=>{

const storedCycles =
localStorage.getItem("cycles");

if(storedCycles){

setCyclesData(
JSON.parse(storedCycles)
);

}

},[]);

const handleSubmit=(e)=>{

e.preventDefault();

const updatedCycles =
cyclesData.map((cycle)=>{

if(
cycle.id === Number(Bid)
){

return {
...cycle,
isBooked:true
};

}

return cycle;

});

localStorage.setItem(
"cycles",
JSON.stringify(
updatedCycles
)
);

navigate(
`/checkout/${Bid}/${paramPhone}`
);

};

return (

<div>

<Header/>

<div className="payment-page">

<div className="payment-grid">

<div className="payment-left">

<div className="secure-banner">

🔒 Your booking information is securely stored until cycle return.

</div>

<div className="payment-card">

<h1>
Payment Details
</h1>

<p>
Complete payment to unlock your ride.
</p>

<form
onSubmit={handleSubmit}
>

{
paymentMethod==="card"
&&(

<>

<div className="form-group">

<label>
Name on Card
</label>

<input
type="text"
value={nameOnCard}
onChange={(e)=>
setNameOnCard(
e.target.value
)
}
required
/>

</div>

<div className="form-group">

<label>
Card Number
</label>

<input
type="text"
value={cardNo}
onChange={(e)=>
setCardNo(
e.target.value
)
}
required
/>

</div>

<div className="split-row">

<div className="form-group">

<label>
Expiry Date
</label>

<input
type="text"
value={expirationDate}
onChange={(e)=>
setExpirationDate(
e.target.value
)
}
required
/>

</div>

<div className="form-group">

<label>
CVV
</label>

<input
type="text"
value={cvv}
onChange={(e)=>
setCvv(
e.target.value
)
}
required
/>

</div>

</div>

<div className="split-row">

<div className="form-group">

<label>
Card Type
</label>

<select
value={cardType}
onChange={(e)=>
setCardType(
e.target.value
)
}
>

<option value="">
Select
</option>

<option value="credit">
Credit Card
</option>

<option value="debit">
Debit Card
</option>

</select>

</div>

<div className="form-group">

<label>
Company
</label>

<select
value={paymentCompany}
onChange={(e)=>
setPaymentCompany(
e.target.value
)
}
>

<option value="">
Select
</option>

<option value="Visa">
Visa
</option>

<option value="RuPay">
RuPay
</option>

<option value="MasterCard">
MasterCard
</option>

</select>

</div>

</div>

</>

)}

{
paymentMethod==="upi"
&&(

<>

<div className="form-group">

<label>
Bank Name
</label>

<input
type="text"
value={bankName}
onChange={(e)=>
setBankName(
e.target.value
)
}
required
/>

</div>

<div className="form-group">

<label>
UPI ID
</label>

<input
type="text"
value={upiId}
onChange={(e)=>
setUpiId(
e.target.value
)
}
required
/>

</div>

</>

)}

{
paymentMethod==="netbanking"
&&(

<>

<div className="form-group">

<label>
Username
</label>

<input
type="text"
value={username}
onChange={(e)=>
setUsername(
e.target.value
)
}
required
/>

</div>

<div className="form-group">

<label>
Password
</label>

<input
type="password"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)
}
required
/>

</div>

<div className="form-group">

<label>
Bank Name
</label>

<input
type="text"
value={bankName}
onChange={(e)=>
setBankName(
e.target.value
)
}
required
/>

</div>

</>

)}

<button
className="pay-btn"
type="submit"
>

Pay ₹{amountToBePaid.toFixed(2)}

</button>

</form>

</div>

</div>

<div className="payment-right">

<div className="summary-card">

<h2>
Booking Summary
</h2>

<div className="summary-item">

<span>
Cycle ID
</span>

<strong>
#{Bid}
</strong>

</div>

<div className="summary-item">

<span>
Duration
</span>

<strong>

{hours}h {minutes}m

</strong>

</div>

<div className="summary-item">

<span>
Method
</span>

<strong>

{paymentMethod}

</strong>

</div>

<div className="divider"></div>

<div className="price-box">

₹ {amountToBePaid.toFixed(2)}

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default Payment;