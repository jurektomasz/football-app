import React, { useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "components/forms/LoginForm";
import ApiErrors from "components/forms/ApiErrors";
import { withAuth } from "providers/AuthProvider";
import { Link } from "react-router-dom";

const Login = ({ auth, location }) => {
  const [errors, setErrors] = useState([]);

  function signIn(loginData) {
    auth.signIn(loginData).catch((errors) => setErrors(errors));
  }

  const { message } = location.state || "";

  return (
    <>
      <div className="row row-res align-items-center">
        <div className="col-lg-7 mx-auto">
          <h1 className="heading--primary">Login</h1>
          {message && <div className="alert alert-success">{message}</div>}
          <LoginForm onSubmit={signIn} />

          <ApiErrors errors={errors} />
          <div className="form-not-registered mt-5 text-center">
            <span className="mr-2">Not registered?</span>
            <span>
              <Link to="/register" className="form-not-registered--link">
                Create an account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withAuth(Login);
