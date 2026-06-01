import "./Main.css";
import logo from "./logo.jpg";
import {useNavigate} from "react-router-dom";

function Main(){

const navigate = useNavigate();

return(

<section className="hero">

<div className="hero-left">

<h1>
Ride Smart.
Ride Green.
Ride PedalPal.
</h1>

<p>
Find nearby bicycles,
unlock instantly,
and enjoy eco-friendly commuting.
</p>

<button
onClick={()=>navigate("/map")}
>
Find Bikes Nearby
</button>

</div>

<div className="hero-right">

<img
src={logo}
alt="PedalPal"
/>

</div>

</section>
);
}

export default Main;