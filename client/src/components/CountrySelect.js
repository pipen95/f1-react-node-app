import React, { useContext } from "react";
import GeoContext from "./GeoContext";

function CountrySelect({ handleChange }) {
  const state = useContext(GeoContext);
  console.log(state);
  return (
    <>
      <label htmlFor="country">Country</label>
      <select
        id="country"
        name="country"
        className="form-control"
        onChange={(e) => handleChange(e)}
        // value={state.data.country || ""}
      >
        <option key="0" value="">
          --Please choose an country--
        </option>

        {state[0].countries[0] !== undefined
          ? state[0].countries[0].data.map(({ name }) => (
              <option value={name}>{name}</option>
            ))
          : state.countries[0].data.map(({ name }) => (
              <option value={name}>{name}</option>
            ))}
      </select>
    </>
  );
}

export default CountrySelect;
