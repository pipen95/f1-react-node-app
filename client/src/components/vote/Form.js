import React, { useReducer, useState, useEffect, useRef } from "react";
import CountrySelect from "./CountrySelect";
import RegionSelect from "./RegionSelect";
import CitySelect from "./CitySelect";
import StarRating from "./StarRating";
import GeoContext from "./GeoContext";
import axios from "axios";

const GeoInitialeState = {
  countries: [],
  regions: [],
  cities: [],
  data: {
    country: {
      name: "",
      iso2: "",
    },
    region: {
      name: "",
      iso2: "",
    },
    city: {
      name: "",
    },
    name: "",
    info_consent: "no",
    rating: 0,
  },
};

const GeoReducer = (state, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return { ...state, countries: [...state.countries, action.countries] };
    case "GET_REGIONS":
      return { ...state, regions: [...state.regions, action.regions] };
    case "GET_CITIES":
      return { ...state, cities: [...state.cities, action.cities] };

    case "ADD_DATA":
      return {
        ...state,
        data: { ...state.data, [action.data.name]: action.data.value },
      };

    case "ADD_ADRESS_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.data.type]: {
            ...state.data[action.data.type],
            name: action.data.name,
            iso2: action.data.iso2,
          },
        },
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

  const { country, region, info_consent, name } = state.data;
  const country_iso = state.data.country.iso2;
  const region_iso = state.data.region.iso2;

  useEffect(() => {
    const getCountries = async () => {
      const options = {
        headers: { "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_API_KEY },
      };
      try {
        const res = await axios(
          " https://api.countrystatecity.in/v1/countries",
          options
        );
        if (res) {
          return dispatch({ type: "GET_COUNTRIES", countries: res.data });
        }
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
      }
    };
    getCountries();

    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    _isMounted.current = true;
    if (country_iso) {
      const getRegions = async () => {
        const options = {
          headers: { "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_API_KEY },
        };
        try {
          const res = await axios(
            `https://api.countrystatecity.in/v1/countries/${country_iso}/states`,
            options
          );
          if (res) {
            return dispatch({ type: "GET_REGIONS", regions: res.data });
          }
        } catch (error) {
          console.log(error.name);
          console.log(error.message);
          console.log(error.stack);
        }
      };
      getRegions();
    }

    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  }, [country_iso]);

  useEffect(() => {
    if (country_iso && region_iso) {
      const getCities = async () => {
        try {
          const options = {
            headers: { "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_API_KEY },
          };
          const res = await axios(
            `https://api.countrystatecity.in/v1/countries/${country_iso}/states/${region_iso}/cities`,
            options
          );
          if (res) {
            return dispatch({ type: "GET_CITIES", cities: res.data });
          }
        } catch (error) {
          console.log(error.name);
          console.log(error.message);
          console.log(error.stack);
        }
      };
      getCities();
    }

    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  }, [country_iso, region_iso]);

  const postData = async (
    id,
    { country, city, name, info_consent, rating, region },
    closeModal
  ) => {
    const payload = {
      driverId: id,
      country: `${!country ? `` : `${country}`}`,
      region: `${!region ? `` : `${region}`}`,
      city: `${!city ? `` : `${city}`}`,
      name: `${!name ? `` : `${name}`}`,
      infoConsent: `${!info_consent ? `no` : `${info_consent}`}`,
      rating: `${!rating ? 1 : rating}`,
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/votes",
        payload
      );
      if (_isMounted.current) {
        console.log(state);
        console.log(res);
        setSubmitting(false);
        closeModal();
      } else {
        _isMounted = null;
      }
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    postData(id, state.data, closeModal);
    dispatch({ type: "RESET" });
    console.log(state.data);
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

  const handleAdressChange = (event) => {
    dispatch({
      type: "ADD_ADRESS_DATA",
      data: {
        type: event.target.name,
        name: event.target.value,
        iso2: event.target[event.target.selectedIndex].id,
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
            <h2 className="text-center">
              What rate do you give {driver_name}?
            </h2>

            <fieldset className="form-group" disabled={submitting}>
              <div className="d-flex justify-content-center align-items-center">
                <StarRating handleChange={handleChange} />
              </div>
            </fieldset>
            <hr className="hr" />
            <h3 className="text-center">
              Would you like to share where you're voting from ?
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
                    <CountrySelect handleAdressChange={handleAdressChange} />
                  </fieldset>
                  {country && (
                    <fieldset className="form-group" disabled={submitting}>
                      <RegionSelect handleAdressChange={handleAdressChange} />
                    </fieldset>
                  )}
                  {region && (
                    <fieldset className="form-group" disabled={submitting}>
                      <CitySelect handleAdressChange={handleAdressChange} />
                    </fieldset>
                  )}
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
