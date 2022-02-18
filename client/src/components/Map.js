import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const bounds = useRef(null);
  const [votes, setVotes] = useState(null);
  let _isMounted = useRef(true);

  // GET LOCATIONS
  useEffect(() => {
    if (_isMounted.current) {
      const getLocations = async () => {
        try {
          const res = await axios("http://localhost:3001/api/v1/votes");
          if (res) {
            return setVotes(res.data.data.votes);
          }
        } catch (error) {
          console.log(error.name);
          console.log(error.message);
          console.log(error.stack);
        }
      };
      getLocations();
    }

    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  });

  useEffect(() => {
    // initialize map when votes are fetched
    if (votes) {
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/navigation-night-v1",
          accessToken:
            "pk.eyJ1IjoicGllcnJlOTUxNzAiLCJhIjoiY2toMWNtMXM5MDBzazM0bzVtcWk5YTN0OCJ9.1piZsy79X9rKgXGywRU9bQ",
        });

        bounds.current = new mapboxgl.LngLatBounds();

        const addPoints = (votes) => {
          votes.forEach((vote) => {
            new mapboxgl.Marker()
              .setLngLat([
                vote.country.coordinates[0],
                vote.country.coordinates[1],
              ])
              .setPopup(
                new mapboxgl.Popup({ offset: 30 }).setHTML(
                  `<p>${vote.name} from ${vote.country.name} says: ${
                    !vote.message ? `Hi!` : `${vote.message}`
                  }</p>`
                )
              ) // add popup
              .addTo(map.current);

            bounds.current.extend([
              vote.country.coordinates[0],
              vote.country.coordinates[1],
            ]);
          });
        };
        addPoints(votes);
        map.current.fitBounds(bounds.current, {
          padding: {
            top: 100,
            bottom: 100,
            left: 50,
            right: 50,
          },
        });

        map.current.addControl(new mapboxgl.NavigationControl());
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
      }
    }
  }, [votes]);

  return (
    <div className="mt-3">
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
}
export default Map;
