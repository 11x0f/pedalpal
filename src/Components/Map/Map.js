import React from "react";
import "./Map.css";
import Header from "../Header/Header";

function Map() {

return (

<div>

<div className="map-page">

<div className="map-header">

<h1>

Locate Bikes Nearby

</h1>

<p>

Explore cycle hubs across Kannur and
find your nearest available ride.

</p>

</div>

<div className="quick-hubs">

<div className="hub-pill">
🚆 Railway Station
</div>

<div className="hub-pill">
✈️ Airport
</div>

<div className="hub-pill">
🏖️ Payyambalam
</div>

<div className="hub-pill">
🛍️ Lulu Mall
</div>

<div className="hub-pill">
🏙️ Fort Road
</div>

</div>

<div className="map-card">

<div className="map-overlay">

<div className="live-badge">

🟢 Live Hub Tracking

</div>

</div>

<iframe

title="PedalPal Map"

src="https://www.google.com/maps/d/u/0/embed?mid=1o_Nm4g6oUQ3dDEFsoq41-K952C81WOk&ehbc=2E312F"

width="100%"

height="700"

style={{
border:0
}}

loading="lazy"

referrerPolicy=
"no-referrer-when-downgrade"

>

</iframe>

</div>

</div>

</div>

);

}

export default Map;