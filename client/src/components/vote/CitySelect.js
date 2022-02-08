import React, { useContext } from "react";
import GeoContext from "./GeoContext";

function CitySelect({ handleAdressChange }) {
  const [state] = useContext(GeoContext);

  if (state.cities[0] === undefined) {
    return null;
  }

  return (
    <>
      <label htmlFor="city">City</label>
      <select
        name="city"
        className="form-control"
        onChange={handleAdressChange}
      >
        <option key="0" value="">
          --Please choose a city--
        </option>

        {state.cities[0] !== undefined &&
          state.cities[0].map(({ name }, i) => (
            <option value={name} key={i}>
              {name}
            </option>
          ))}
      </select>
    </>
  );
}

export default CitySelect;
