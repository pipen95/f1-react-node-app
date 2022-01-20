import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoicGllcnJlOTUxNzAiLCJhIjoiY2toMWNtMXM5MDBzazM0bzVtcWk5YTN0OCJ9.1piZsy79X9rKgXGywRU9bQ";

function MapArea() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="mt-5" ref={mapContainer} className="map-container" />
    </div>
  );
}
export default MapArea;
