import React, { useState } from "react";
import RegisterForm from "components/forms/RegisterForm";
import { registerUser } from "redux/actions";
import { Redirect } from "react-router-dom";
import ApiErrors from "components/forms/ApiErrors";

const Register = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState([]);

  function signUp(registerData) {
    registerUser(registerData)
      .then(() => setShouldRedirect(true))
      .catch((errors) => {
        setErrors(errors);
      });
  }

  return shouldRedirect ? (
    <Redirect
      to={{
        pathname: "/login",
        state: { message: "You have been succesfuly registered!" },
      }}
    />
  ) : (
    <>
      <div className="row row-res align-items-center">
        <div className="col-lg-7 mx-auto">
          <h1 className="heading--primary">Register</h1>
          <RegisterForm onSubmit={signUp} />
          <ApiErrors errors={errors} />
        </div>
      </div>
    </>
  );
};

export default Register;
