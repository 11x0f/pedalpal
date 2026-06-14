import "./Map.css";

const HUBS = [
  { id: "railway",     label: "Railway Station" },
  { id: "airport",     label: "Airport" },
  { id: "payyambalam", label: "Payyambalam Beach" },
  { id: "fortroad",    label: "Fort Road" },
];

function Map({ onProceed }) {
  return (
    <div className="map-page">

      <div className="map-top">
        <div className="map-top-text">
          <p className="map-eyebrow">Kannur, Kerala</p>
          <h1 className="map-title">Find a bike near you</h1>
          <p className="map-sub">
            Explore cycle hubs across Kannur and pick the one closest to you.
          </p>
        </div>

        <div className="map-hub-pills">
          {HUBS.map((h) => (
            <span key={h.id} className="map-pill">{h.label}</span>
          ))}
        </div>
      </div>

      <div className="map-frame-wrap">
        <div className="map-live-badge">
          <span className="map-live-dot" />
          Live hub tracking
        </div>

        <iframe
          title="PedalPal Map"
          src="https://www.google.com/maps/d/u/0/embed?mid=1o_Nm4g6oUQ3dDEFsoq41-K952C81WOk&ehbc=2E312F"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="map-bottom-card">
          <div className="map-bottom-text">
            <p className="map-bottom-title">Ready to book?</p>
            <p className="map-bottom-sub">Select a hub and see available bikes.</p>
          </div>
          <button className="map-proceed-btn" onClick={onProceed}>
            Choose a hub →
          </button>
        </div>
      </div>

    </div>
  );
}

export default Map;