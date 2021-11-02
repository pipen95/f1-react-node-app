import React, { useContext } from "react";
import GeoContext from "./GeoContext";

function RegionSelect({ handleChange }) {
  const [state] = useContext(GeoContext);
  return (
    <>
      <label htmlFor="region">Region</label>
      <select
        id="region"
        name="region"
        className="form-control"
        onChange={(e) => handleChange(e)}
        value={state.data.region || ""}
      >
        <option key="0" value="">
          --Please choose a state--
        </option>

        {state.regions[0] !== undefined &&
          state.regions[0].data.states.map(({ name }) => (
            <option value={name}>{name}</option>
          ))}
      </select>
    </>
  );
}

export default RegionSelect;
