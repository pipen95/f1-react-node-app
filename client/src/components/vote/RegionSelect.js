import React, { useContext } from "react";
import GeoContext from "./GeoContext";

function RegionSelect({ handleAdressChange }) {
  const [state] = useContext(GeoContext);
  return (
    <>
      <label htmlFor="region">Region</label>
      <select
        name="region"
        className="form-control"
        onChange={handleAdressChange}
      >
        <option key="0" value="">
          --Please choose a state--
        </option>

        {state.regions[0] !== undefined &&
          state.regions[0].map(({ name, iso2 }) => (
            <option value={name} key={iso2} id={iso2}>
              {name}
            </option>
          ))}
      </select>
    </>
  );
}

export default RegionSelect;
