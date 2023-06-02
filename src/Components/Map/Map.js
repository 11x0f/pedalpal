import React, {useRef, useEffect, useState} from 'react';
import maplibregl from 'maplibre-gl';
import './Map.css';


export default function Map(){
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(76.936638);
    const [lat] = useState(8.524139);
    const [zoom] = useState(14);
    const [API_KEY] = useState('9oidx5317zefdkkw9yjG');
  
    useEffect(() => {
      if (map.current) return;
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${ '9oidx5317zefdkkw9yjG'}`,
        center: [lng, lat],
        zoom: zoom
      });
  
    });
  
    return (
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    );
  }


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