import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const ADMIN_PIN = "1234";
const HUBS = ["Railway", "Airport", "Lulu Mall", "Payyambalam"];
const MODELS = ["Mountain Bike", "City Bike", "Road Bike"];

function Admin() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("adminAuth") === "true");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [tab, setTab] = useState("bikes");
  const [cycles, setCycles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [history, setHistory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editHub, setEditHub] = useState("");

  // Add bike form
  const [newModel, setNewModel] = useState(MODELS[0]);
  const [newHub, setNewHub] = useState(HUBS[0]);
  const [newPrice, setNewPrice] = useState(10);

  useEffect(() => {
    if (!authed) return;
    reload();
  }, [authed]);

  const reload = () => {
    setCycles(JSON.parse(localStorage.getItem("cycles") || "[]"));
    setCustomers(JSON.parse(localStorage.getItem("customerData") || "[]"));
    setHistory(JSON.parse(localStorage.getItem("rideHistory") || "[]"));
  };

  const handlePinLogin = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("adminAuth", "true");
      setAuthed(true);
    } else {
      setPinError("Incorrect PIN. Try again.");
      setPin("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/");
  };

  const toggleBike = (id) => {
    const updated = cycles.map((c) =>
      c.id === id ? { ...c, isBooked: !c.isBooked } : c
    );
    localStorage.setItem("cycles", JSON.stringify(updated));
    setCycles(updated);
  };

  const saveHub = (id) => {
    const updated = cycles.map((c) =>
      c.id === id ? { ...c, position: editHub } : c
    );
    localStorage.setItem("cycles", JSON.stringify(updated));
    setCycles(updated);
    setEditingId(null);
  };

  const removeBike = (id) => {
    const updated = cycles.filter((c) => c.id !== id);
    localStorage.setItem("cycles", JSON.stringify(updated));
    setCycles(updated);
  };

  const addBike = (e) => {
    e.preventDefault();
    const newId = cycles.length ? Math.max(...cycles.map((c) => c.id)) + 1 : 1;
    const unqId = Math.random().toString(36).slice(2, 8);
    const bike = { id: newId, model: newModel, price: Number(newPrice), isBooked: false, position: newHub, unqId };
    const updated = [...cycles, bike];
    localStorage.setItem("cycles", JSON.stringify(updated));
    setCycles(updated);
  };

  // Revenue calcs
  const completed = history.filter((r) => r.status === "completed");
  const totalRevenue = completed.reduce((s, r) => s + (r.amount || 0), 0);
  const revenueByHub = HUBS.map((h) => ({
    hub: h,
    amount: completed.filter((r) => r.pickupHub === h).reduce((s, r) => s + (r.amount || 0), 0),
    rides: completed.filter((r) => r.pickupHub === h).length,
  }));
  const revenueByModel = MODELS.map((m) => ({
    model: m,
    amount: completed.filter((r) => r.bikeModel === m).reduce((s, r) => s + (r.amount || 0), 0),
    rides: completed.filter((r) => r.bikeModel === m).length,
  }));
  const activeBookings = cycles.filter((c) => c.isBooked);
  const maxHubRevenue = Math.max(...revenueByHub.map((h) => h.amount), 1);
  const maxModelRevenue = Math.max(...revenueByModel.map((m) => m.amount), 1);

  const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";

  if (!authed) {
    return (
      <div className="adm-login-shell">
        <div className="adm-login-card">
          <div className="adm-login-mark" />
          <h1 className="adm-login-title">Admin access</h1>
          <p className="adm-login-sub">Enter your PIN to continue.</p>
          {pinError && <div className="adm-login-error">{pinError}</div>}
          <form onSubmit={handlePinLogin}>
            <div className="adm-pin-row">
              {[0,1,2,3].map((i) => (
                <input
                  key={i}
                  className="adm-pin-input"
                  type="password"
                  maxLength={1}
                  value={pin[i] || ""}
                  readOnly
                />
              ))}
            </div>
            <div className="adm-numpad">
              {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k, i) => (
                <button
                  key={i}
                  type={k === "" ? "button" : "button"}
                  className={`adm-key${k === "" ? " adm-key--blank" : ""}`}
                  onClick={() => {
                    if (k === "⌫") { setPin((p) => p.slice(0, -1)); setPinError(""); }
                    else if (k !== "" && pin.length < 4) setPin((p) => p + k);
                  }}
                >
                  {k}
                </button>
              ))}
            </div>
            <button type="submit" className="adm-login-btn" disabled={pin.length < 4}>
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-shell">
      <header className="adm-header">
        <div className="adm-header-brand">
          <div className="adm-header-mark" />
          <span>PedalPal Admin</span>
        </div>
        <div className="adm-header-right">
          <span className="adm-header-meta">{cycles.filter(c => !c.isBooked).length} bikes available · {activeBookings.length} active</span>
          <button className="adm-header-logout" onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <div className="adm-body">
        {/* Sidebar */}
        <nav className="adm-sidebar">
          {[
            { id: "bikes",    label: "All bikes",       count: cycles.length },
            { id: "bookings", label: "Active bookings", count: activeBookings.length },
            { id: "add",      label: "Add / remove",    count: null },
            { id: "revenue",  label: "Revenue",         count: null },
          ].map((item) => (
            <button
              key={item.id}
              className={`adm-nav-item${tab === item.id ? " adm-nav-item--active" : ""}`}
              onClick={() => { setTab(item.id); reload(); }}
            >
              <span>{item.label}</span>
              {item.count !== null && <span className="adm-nav-count">{item.count}</span>}
            </button>
          ))}
        </nav>

        {/* Main content */}
        <main className="adm-main">

          {/* BIKES TAB */}
          {tab === "bikes" && (
            <div>
              <p className="adm-tab-title">All bikes</p>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Model</th>
                      <th>Price</th>
                      <th>Hub</th>
                      <th>Status</th>
                      <th>Return ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cycles.map((c) => (
                      <tr key={c.id}>
                        <td className="adm-td-muted">{c.id}</td>
                        <td>{c.model}</td>
                        <td>₹{c.price}/hr</td>
                        <td>
                          {editingId === c.id ? (
                            <div className="adm-inline-edit">
                              <select value={editHub} onChange={(e) => setEditHub(e.target.value)} className="adm-select">
                                {HUBS.map((h) => <option key={h}>{h}</option>)}
                              </select>
                              <button className="adm-btn adm-btn--sm adm-btn--primary" onClick={() => saveHub(c.id)}>Save</button>
                              <button className="adm-btn adm-btn--sm" onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                          ) : (
                            <span className="adm-hub-link" onClick={() => { setEditingId(c.id); setEditHub(c.position); }}>{c.position} ✎</span>
                          )}
                        </td>
                        <td>
                          <span className={`adm-status${c.isBooked ? " adm-status--booked" : " adm-status--free"}`}>
                            {c.isBooked ? "Booked" : "Available"}
                          </span>
                        </td>
                        <td className="adm-mono">{c.unqId}</td>
                        <td>
                          <button
                            className={`adm-btn adm-btn--sm${c.isBooked ? " adm-btn--warn" : " adm-btn--primary"}`}
                            onClick={() => toggleBike(c.id)}
                          >
                            {c.isBooked ? "Mark free" : "Mark booked"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BOOKINGS TAB */}
          {tab === "bookings" && (
            <div>
              <p className="adm-tab-title">Active bookings</p>
              {customers.length === 0 ? (
                <div className="adm-empty">No active bookings right now.</div>
              ) : (
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Phone</th>
                        <th>Return ID</th>
                        <th>Bike</th>
                        <th>Model</th>
                        <th>Hub</th>
                        <th>Booked at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((cust, i) => {
                        const bike = cycles.find((c) => c.unqId === cust.uniqueId);
                        const ride = history.find((r) => r.uniqueId === cust.uniqueId && r.status === "active");
                        return (
                          <tr key={i}>
                            <td>{cust.phoneNumber}</td>
                            <td className="adm-mono">{cust.uniqueId}</td>
                            <td className="adm-td-muted">#{bike?.id || "—"}</td>
                            <td>{bike?.model || "—"}</td>
                            <td>{bike?.position || "—"}</td>
                            <td className="adm-td-muted">{fmtDate(ride?.date)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ADD / REMOVE TAB */}
          {tab === "add" && (
            <div className="adm-add-layout">
              <div>
                <p className="adm-tab-title">Add a bike</p>
                <form className="adm-add-form" onSubmit={addBike}>
                  <div className="adm-field">
                    <label>Model</label>
                    <select className="adm-select" value={newModel} onChange={(e) => setNewModel(e.target.value)}>
                      {MODELS.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="adm-field">
                    <label>Hub</label>
                    <select className="adm-select" value={newHub} onChange={(e) => setNewHub(e.target.value)}>
                      {HUBS.map((h) => <option key={h}>{h}</option>)}
                    </select>
                  </div>
                  <div className="adm-field">
                    <label>Price (₹/hr)</label>
                    <input type="number" className="adm-input" value={newPrice} min={1}
                      onChange={(e) => setNewPrice(e.target.value)} required />
                  </div>
                  <button type="submit" className="adm-btn adm-btn--primary">Add bike</button>
                </form>
              </div>

              <div>
                <p className="adm-tab-title">Remove a bike</p>
                <div className="adm-remove-list">
                  {cycles.map((c) => (
                    <div key={c.id} className="adm-remove-row">
                      <div>
                        <span className="adm-remove-name">#{c.id} · {c.model}</span>
                        <span className="adm-remove-meta">{c.position} · ₹{c.price}/hr</span>
                      </div>
                      <button
                        className="adm-btn adm-btn--sm adm-btn--danger"
                        disabled={c.isBooked}
                        onClick={() => removeBike(c.id)}
                        title={c.isBooked ? "Cannot remove a booked bike" : "Remove bike"}
                      >
                        {c.isBooked ? "In use" : "Remove"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REVENUE TAB */}
          {tab === "revenue" && (
            <div>
              <p className="adm-tab-title">Revenue overview</p>

              <div className="adm-stat-grid">
                <div className="adm-stat-card">
                  <span className="adm-stat-val">₹{totalRevenue.toFixed(0)}</span>
                  <span className="adm-stat-lbl">Total revenue</span>
                </div>
                <div className="adm-stat-card">
                  <span className="adm-stat-val">{completed.length}</span>
                  <span className="adm-stat-lbl">Completed rides</span>
                </div>
                <div className="adm-stat-card">
                  <span className="adm-stat-val">₹{completed.length ? (totalRevenue / completed.length).toFixed(0) : 0}</span>
                  <span className="adm-stat-lbl">Avg per ride</span>
                </div>
                <div className="adm-stat-card">
                  <span className="adm-stat-val">{activeBookings.length}</span>
                  <span className="adm-stat-lbl">Active now</span>
                </div>
              </div>

              <div className="adm-rev-layout">
                <div>
                  <p className="adm-rev-section-title">By hub</p>
                  {revenueByHub.map((h) => (
                    <div key={h.hub} className="adm-bar-row">
                      <span className="adm-bar-label">{h.hub}</span>
                      <div className="adm-bar-track">
                        <div className="adm-bar-fill" style={{ width: `${(h.amount / maxHubRevenue) * 100}%` }} />
                      </div>
                      <span className="adm-bar-val">₹{h.amount.toFixed(0)}</span>
                      <span className="adm-bar-rides">{h.rides} rides</span>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="adm-rev-section-title">By model</p>
                  {revenueByModel.map((m) => (
                    <div key={m.model} className="adm-bar-row">
                      <span className="adm-bar-label">{m.model}</span>
                      <div className="adm-bar-track">
                        <div className="adm-bar-fill adm-bar-fill--teal" style={{ width: `${(m.amount / maxModelRevenue) * 100}%` }} />
                      </div>
                      <span className="adm-bar-val">₹{m.amount.toFixed(0)}</span>
                      <span className="adm-bar-rides">{m.rides} rides</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Admin;