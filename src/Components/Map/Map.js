import React from "react";

import "./Map.css";

function Map() {

    const hubs = [
        "🚆 Railway Station",
        "✈️ Airport",
        "🏖️ Payyambalam",
        "🏙️ Fort Road",
    ];

    return (
        <div className="map-page">

            <div className="map-header">

                <h1>
                    Locate Bikes Nearby
                </h1>

                <p>
                    Explore cycle hubs across Kannur
                    and find your nearest
                    available ride.
                </p>

            </div>

            <div className="quick-hubs">

                {hubs.map((hub) => (
                    <div
                        key={hub}
                        className="hub-pill"
                    >
                        {hub}
                    </div>
                ))}

            </div>

            <div className="map-card">

                <div className="map-overlay">

                    <div className="live-badge">
                        🔵 Live Hub Tracking
                    </div>

                </div>

                <iframe
                    title="PedalPal Map"
                    src="https://www.google.com/maps/d/u/0/embed?mid=1o_Nm4g6oUQ3dDEFsoq41-K952C81WOk&ehbc=2E312F"
                    width="100%"
                    height="700"
                    style={{
                        border: 0,
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

            </div>

        </div>
    );
}

export default Map;