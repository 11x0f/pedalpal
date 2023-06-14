import React, {useRef, useEffect, useState} from 'react';
import maplibregl from 'maplibre-gl';
import './Map.css';


function Map() {
  return (
    <div className="map">
<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1o_Nm4g6oUQ3dDEFsoq41-K952C81WOk&ehbc=2E312F"
 width="97%"
  height="700"
   style={{border: "0"}} 
   allowfullscreen="" 
   loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}
  


  export default Map;

/* export default function Map()
{
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(139.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(14);
    const [API_KEY] = useState('9oidx5317zefdkkw9yjG');
}

useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=${9oidx5317zefdkkw9yjG}',
      center: [lng, lat],
      zoom: zoom
    });
  
  });

 return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  ); 

 */