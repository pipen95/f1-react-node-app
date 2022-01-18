import React, { useReducer, useState, useEffect, useRef } from "react";
import CountrySelect from "./CountrySelect";
import RegionSelect from "./RegionSelect";
import CitySelect from "./CitySelect";
import StarRating from "./StarRating";
import GeoContext from "./GeoContext";
import axios from "axios";

// GLOBAL STATE

const GeoInitialeState = {
  countries: [],
  regions: [],
  cities: [],
  data: {
    country: {
      name: "",
      iso: "",
      geo_lat: "",
      geo_long: "",
    },
    region: {
      _name: "",
      iso: "",
      geo_lat: "",
      geo_long: "",
    },
    city: {
      name: "",
    },
    name: "",
    info_consent: "no",
    rating: 0,
  },
};

// REDUCER

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
            iso: action.data.iso,
            geo_lat: action.data.geo_lat,
            geo_long: action.data.geo_long,
          },
        },
      };

    case "RESET":
      return GeoInitialeState;

    default:
      return state;
  }
};

// FORM

export const Form = ({ id, driver_name, closeModal }) => {
  const [state, dispatch] = useReducer(GeoReducer, GeoInitialeState);
  const [submitting, setSubmitting] = useState(false);
  let _isMounted = useRef(true);

  // DATA VARIABLES
  // General data
  const { info_consent, name, rating } = state.data;

  // City variables
  const city_name = state.data.city.name;

  // Country variables
  const country_name = state.data.country.name;
  const country_iso = state.data.country.iso;
  const country_geo_lat = state.data.country.geo_lat;
  const country_geo_long = state.data.country.geo_long;

  // Region variables
  const region_name = state.data.region.name;
  const region_iso = state.data.region.iso;
  const region_geo_lat = state.data.region.geo_lat;
  const region_geo_long = state.data.region.geo_long;

  // API CALLS

  // GET COUNTRIES
  useEffect(() => {
    const getCountries = async () => {
      const options = {
        headers: { "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_API_KEY },
      };
      try {
        const res = await axios(
          "https://api.countrystatecity.in/v1/countries",
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

  // GET REGIONS
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

  // GET CITIES + GET GEOLOCATIONS
  useEffect(() => {
    if (country_iso) {
      const getCountryLocation = async () => {
        try {
          const options = {
            headers: { "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_API_KEY },
          };
          const res = await axios(
            `https://api.countrystatecity.in/v1/countries/${country_iso}`,
            options
          );

          if (res) {
            return dispatch({
              type: "ADD_ADRESS_DATA",
              data: {
                type: "country",
                geo_lat: res.data.latitude,
                geo_long: res.data.longitude,
              },
            });
          }
        } catch (error) {
          console.log(error.name);
          console.log(error.message);
          console.log(error.stack);
        }
      };
      getCountryLocation();
    }

    if (region_iso) {
      const getRegionLocation = async () => {
        try {
          const options = {
            headers: { "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_API_KEY },
          };
          const res = await axios(
            `https://api.countrystatecity.in/v1/countries/${country_iso}/states/${region_iso}`,
            options
          );

          if (res) {
            return dispatch({
              type: "ADD_ADRESS_DATA",
              data: {
                type: "region",
                geo_lat: res.data.latitude,
                geo_long: res.data.longitude,
              },
            });
          }
        } catch (error) {
          console.log(error.name);
          console.log(error.message);
          console.log(error.stack);
        }
      };
      getRegionLocation();
    }

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

  // SUBMIT POST REQUEST
  const postData = async (id, closeModal) => {
    const payload = {
      driverId: id,
      country: {
        coordinates: [country_geo_lat, country_geo_long],
        name: `${!country_name ? `` : `${country_name}`}`,
        iso: `${!country_iso ? `` : `${country_iso}`}`,
      },
      region: {
        coordinates: [region_geo_lat, region_geo_long],
        name: `${!region_name ? `` : `${region_name}`}`,
        iso: `${!region_iso ? `` : `${region_iso}`}`,
      },
      city: `${!city_name ? `` : `${city_name}`}`,
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

  // HANDLER FONCTIONS

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
        iso: event.target[event.target.selectedIndex].id,
      },
    });
  };

  // JSX FORM

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
                  {country_name && (
                    <fieldset className="form-group" disabled={submitting}>
                      <RegionSelect handleAdressChange={handleAdressChange} />
                    </fieldset>
                  )}
                  {region_name && (
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
