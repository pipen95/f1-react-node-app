import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoicGllcnJlOTUxNzAiLCJhIjoiY2toMWNtMXM5MDBzazM0bzVtcWk5YTN0OCJ9.1piZsy79X9rKgXGywRU9bQ";

function MapArea() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  let _isMounted = useRef(true);
  const [lng, setLng] = useState(22.6);
  const [lat, setLat] = useState(26.8);
  const [zoom, setZoom] = useState(1);
  const [votes, setVotes] = useState(null);

  // GET LOCATIONS
  useEffect(() => {
    if (_isMounted.current) {
      const getLocations = async () => {
        try {
          const res = await axios("http://localhost:3001/api/v1/votes");
          if (res) {
            return setVotes(res.data);
          }
        } catch (error) {
          console.log(error.name);
          console.log(error.message);
          console.log(error.stack);
        }
      };
      getLocations();
    }
    if (votes) {
      console.log(votes.data);
    }

    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  });

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
    <div className="mt-3">
      <div ref={mapContainer} className="map-container">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
}
export default MapArea;
