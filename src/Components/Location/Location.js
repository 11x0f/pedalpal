import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Map from "../Map/Map";
import "./Location.css";

function Location() {
  const navigate = useNavigate();

  return (
    <div className="loc-page">
      <Header />
      <Map onProceed={() => navigate("/hub")} />
    </div>
  );
}

export default Location;