import React, { useReducer, useState, useEffect, useRef } from "react";
import CountrySelect from "./CountrySelect";
import StateSelect from "./StateSelect";
import StarRating from "./StarRating";
import GeoContext from "./GeoContext";
import axios from "axios";

const GeoInitialeState = {
  countries: [],
  states: [],
  cities: [],
  data: {
    country: "",
    name: "",
    info_consent: "no",
    rating: 0,
  },
};

const GeoReducer = (state, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return { ...state, countries: [...state.countries, action.countries] };
    case "GET_STATES":
      return { ...state, states: [...state.states, action.states] };

    case "ADD_DATA":
      return {
        ...state,
        data: { ...state.data, [action.data.name]: action.data.value },
      };

    case "RESET":
      return GeoInitialeState;

    default:
      return state;
  }
};

export const Form = ({ id, driver_name, closeModal }) => {
  const [state, dispatch] = useReducer(GeoReducer, GeoInitialeState);
  const [submitting, setSubmitting] = useState(false);
  let _isMounted = useRef(true);
  const { country, name, info_consent } = state.data;
  useEffect(() => {
    const getCountries = async () => {
      const res = await axios(
        "https://countriesnow.space/api/v0.1/countries/flag/images"
      );
      if (res) {
        return dispatch({ type: "GET_COUNTRIES", countries: res.data });
      }
    };
    getCountries();

    if (country) {
      let raw = { country: `${country}` };
      const getStates = async () => {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          raw
        );
        if (res) {
          return dispatch({ type: "GET_STATES", states: res.data });
        }
        console.log(res.data);
      };
      getStates();
    }

    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  }, [country]);

  const postData = async (
    id,
    { country, name, info_consent, rating },
    closeModal
  ) => {
    const payload = {
      driverId: id,
      country: `${country !== undefined ? `${country}` : `anonymous`}`,
      name: `${name !== undefined ? `${name}` : `anonymous`}`,
      infoConsent: `${info_consent !== undefined ? `${info_consent}` : `no`}`,
      rating: `${rating !== undefined ? `${rating}` : `no rate`}`,
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/votes",
        payload
      );
      if (_isMounted.current) {
        console.log(state);
        console.log(res);
        dispatch({ type: "RESET" });
        setSubmitting(false);
        if (res.status === 201 || 204) {
          closeModal();
        }
      } else {
        _isMounted = null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    postData(id, state.data, closeModal);
  };

  const handleChange = (event) => {
    dispatch({
      type: "ADD_DATA",
      data: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <div>
      {submitting ? (
        <>
          <h2 className="text-center">Thank you for Voting !</h2>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">How much do you rate {driver_name}?</h2>

            <fieldset className="form-group" disabled={submitting}>
              <div className="d-flex justify-content-center align-items-center">
                <StarRating handleChange={handleChange} />
              </div>
            </fieldset>
            <hr className="hr" />
            <h3 className="text-center">
              Can you share where you're voting from ?
            </h3>
            <fieldset
              className="mt-4 mb-2 d-flex justify-content-center align-items-center"
              disabled={submitting}
            >
              <div className="form-check mr-2" onChange={handleChange}>
                <input
                  className="form-check-input"
                  type="radio"
                  value="yes"
                  name="info_consent"
                  id="yes"
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check" onChange={handleChange}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="info_consent"
                  value="no"
                  id="no"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </fieldset>

            {info_consent === "yes" && (
              <div>
                <fieldset className="form-group" disabled={submitting}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    value={name || ""}
                  />
                </fieldset>

                <GeoContext.Provider value={[state]}>
                  <fieldset className="form-group" disabled={submitting}>
                    <CountrySelect handleChange={handleChange} />
                  </fieldset>
                  {state.states && (
                    <fieldset className="form-group" disabled={submitting}>
                      <StateSelect handleChange={handleChange} />
                    </fieldset>
                  )}
                  {/* {state !== "" && 
                  <fieldset className="form-group" disabled={submitting}>
                  <CitySelect />} 
                  </fieldset>
                  */}
                </GeoContext.Provider>
              </div>
            )}

            <div className="form-group">
              <button
                className="form-control btn btn-primary"
                type="submit"
                disabled={submitting}
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
export default Form;
