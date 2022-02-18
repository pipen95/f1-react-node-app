import React, { useRef, useState} from "react";
import axios from "axios";

export const Login = ({ id, closeModal }) => {
  let _isMounted = useRef(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  // HANDLER FONCTIONS

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    postData(id,closeModal);
  };

    // SUBMIT POST REQUEST
    const postData = async (email,password, closeModal) => {
      const payload = {
        email,
        password, 
      };


      try {
        const res = await axios.post(
          "http://localhost:3001/api/v1/login",
          payload
        );
        if (_isMounted.current && res) {
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
                    onChange={setEmail}
                    value={email || ""}
                  />
                </fieldset>
                <fieldset className="form-group" disabled={submitting}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    id="password"
                    className="form-control"
                    name="password"
                    onChange={setPassword}
                    value={password || ""}
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
