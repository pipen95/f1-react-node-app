import React, { useContext } from "react";
import GeoContext from "./GeoContext";

function StateSelect({ handleChange }) {
  const [state] = useContext(GeoContext);
  console.log(state);
  return (
    <>
      <label htmlFor="state">State</label>
      <select
        id="state"
        name="state"
        className="form-control"
        onChange={(e) => handleChange(e)}
        // value={state.data.state || ""}
      >
        <option key="0" value="">
          --Please choose a state--
        </option>

        {/* {state.states[0].data.states.map(({ name }) => (
          <option value={name}>{name}</option>
        ))} */}
      </select>
    </>
  );
}

export default StateSelect;
