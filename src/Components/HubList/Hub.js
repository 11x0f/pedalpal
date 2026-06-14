import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Hub.css";

const HUBS = [
  { id: "railway",     name: "Kannur Railway Station",       desc: "Fast city pickup point",    tag: "Most popular" },
  { id: "airport",     name: "Kannur International Airport", desc: "Traveller's mobility hub",  tag: null },
  { id: "payyambalam", name: "Payyambalam Beach",            desc: "Ride along the coastline",  tag: "Scenic route" },
  { id: "fortroad",    name: "Fort Road",                    desc: "Central city location",     tag: null },
];

function Hub() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
    <div>
      <Header />

      <div className="hub-page">
        <div className="hub-page-header">
          <p className="hub-eyebrow">Step 1 of 3</p>
          <h1>Where are you picking up?</h1>
          <p className="hub-sub">Choose a hub in Kannur to see bikes available there.</p>
        </div>

        <div className="hub-grid">
          {HUBS.map((hub) => (
            <button
              key={hub.id}
              className={`hub-card${selected === hub.id ? " hub-card--selected" : ""}`}
              onClick={() => setSelected(hub.id)}
            >
              <div className="hub-card-top">
                {hub.tag && (
                  <span className="hub-tag">{hub.tag}</span>
                )}
                {selected === hub.id && (
                  <span className="hub-check">✓</span>
                )}
              </div>
              <h3 className="hub-card-name">{hub.name}</h3>
              <p className="hub-card-desc">{hub.desc}</p>
            </button>
          ))}
        </div>

        <div className="hub-footer">
          {selected && (
            <p className="hub-selection-label">
              Pickup from <strong>{HUBS.find(h => h.id === selected)?.name}</strong>
            </p>
          )}
          <button
            className="hub-continue"
            disabled={!selected}
            onClick={() => navigate(`/cyclelist/${selected}`)}
          >
            See available bikes →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hub;