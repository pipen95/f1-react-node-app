import React, { useContext } from "react";
import GeoContext from "./GeoContext";

function CountrySelect({ handleAdressChange }) {
  const [state] = useContext(GeoContext);
  return (
    <>
      <label htmlFor="country">Country</label>
      <select
        name="country"
        className="form-control"
        onChange={handleAdressChange}
      >
        <option key="0" value="">
          --Please choose an country--
        </option>

        {state.countries[0] !== undefined &&
          state.countries[0].map(({ name, iso2 }) => (
            <option value={name} key={iso2} id={iso2}>
              {name}
            </option>
          ))}
      </select>
    </>
  );
}

export default CountrySelect;
