import React, { useContext } from "react";
import GeoContext from "./GeoContext";

function CitySelect({ handleChange }) {
  const [state] = useContext(GeoContext);

  if (state.cities[0] === undefined) {
    return null;
  }

  return (
    <>
      <label htmlFor="city">City</label>
      <select
        id="city"
        name="city"
        className="form-control"
        onChange={(e) => handleChange(e)}
        value={state.data.city || ""}
      >
        <option key="0" value="">
          --Please choose a city--
        </option>

        {state.cities[0].data.lenght !== 0 &&
          state.cities[0].data.map((city) => (
            <option value={city}>{city}</option>
          ))}
      </select>
    </>
  );
}

export default CitySelect;
