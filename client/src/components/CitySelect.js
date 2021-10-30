import React, { useContext } from "react";
import GeoContext from "./GeoContext";

function CitySelect({ handleChange }) {
  const state = useContext(GeoContext);
  console.log(state);
  return (
    <>
      <label htmlFor="city">City</label>
      <select
        id="city"
        name="city"
        className="form-control"
        onChange={(e) => handleChange(e)}
        // value={state.data.city || ""}
      >
        <option key="0" value="">
          --Please choose a city--
        </option>

        {/* {state.cities[0] !== undefined &&
          state.cities[0].data.cities.map(({ name }) => (
            <option value={name}>{name}</option>
          ))} */}
      </select>
    </>
  );
}

export default CitySelect;
