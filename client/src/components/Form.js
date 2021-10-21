import React, { useReducer, useState } from "react";
import CountrySelectOptions from "./CountrySelect";
import StarRating from "./StarRating";
import axios from "axios";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      country: "",
      name: "",
      info_consent: "no",
      rating: 0,
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

export const Form = ({ id, driver_name, closeModal }) => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(id, formData, closeModal);
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const postData = async (id, formData, closeModal) => {
    const payload = {
      driverId: id,
      country: `${
        formData.country !== undefined ? `${formData.country}` : `anonymous`
      }`,
      name: `${formData.name !== undefined ? `${formData.name}` : `anonymous`}`,
      infoConsent: `${
        formData.info_consent !== undefined ? `${formData.info_consent}` : `no`
      }`,
      rating: `${
        formData.rating !== undefined ? `${formData.rating}` : `no rate`
      }`,
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/votes",
        payload
      );
      if (res.status === 201 || 204) {
        console.log(formData);
        console.log(res);
        setFormData({
          reset: true,
        });
        window.setTimeout(() => {
          closeModal();
          setSubmitting(false);
        }, 2000);
      }
      return res.data.body;
    } catch (error) {
      console.log(error);
    }
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

            {formData.info_consent === "yes" && (
              <div>
                <fieldset className="form-group" disabled={submitting}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    value={formData.name || ""}
                  />
                </fieldset>
                <fieldset className="form-group" disabled={submitting}>
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.country || ""}
                  >
                    <CountrySelectOptions />
                  </select>
                </fieldset>
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
