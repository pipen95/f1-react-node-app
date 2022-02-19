import React, {useState} from "react";
import axios from "axios";

export const Login = ({closeModal }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  console.log(formData);

  // HANDLER FONCTIONS

  const handleChange = (event) => {
    return setFormData({...formData, [event.target.name]: event.target.value})
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    postData(formData,closeModal);
    return setFormData({
      email: "",
      password: ""
    })
  };

    // SUBMIT POST REQUEST
    const postData = async (data, closeModal) => {
      const payload = {
        email: data.email,
        password: data.password, 
      }
      try {
        const res = await axios.post(
          "http://localhost:3001/api/v1/users/login",
          payload
        );
        if (res) {
          setSubmitting(false);
          closeModal();
        }
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
      }
    };

  // JSX FORM
  return (
    <div>
      {submitting ? (
        <>
          <h2 className="text-center">Welcome back!</h2>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">
              Login Form
            </h2>
              <div>
                <fieldset className="form-group" disabled={submitting}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </fieldset>
                <fieldset className="form-group" disabled={submitting}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    id="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </fieldset>
              </div>
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

export default Login;
