import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { sameAs, EMAIL_PATTERN } from "components/helpers/validators";
import { checkInput } from "components/helpers/inputs";

const RegisterForm = ({ onSubmit }) => {
  const { register, errors, handleSubmit, getValues } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          ref={register({ required: true })}
          name="username"
          type="text"
          className="form-control form__input"
          id="registerUsername"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="registerUsername">
          Username
        </label>
        {errors.username && (
          <div className="alert alert-danger">
            {errors.username.type === "required" && (
              <span className="alert-message">Username required</span>
            )}
          </div>
        )}
      </div>

      <div className="form-group">
        <input
          ref={register({ required: true, pattern: EMAIL_PATTERN })}
          name="email"
          type="email"
          className="form-control form__input"
          id="registerEmail"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="registerEmail">
          Email address
        </label>

        {errors.email && (
          <div className="alert alert-danger">
            {errors.email.type === "required" && <span>Email is required</span>}
            {errors.email.type === "pattern" && (
              <span className="alert-message">Invalid email format</span>
            )}
          </div>
        )}
      </div>

      <div className="form-group">
        <input
          ref={register({ required: true, minLength: 4 })}
          name="password"
          type="password"
          className="form-control form__input"
          id="registerPassword"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="registerPassword">
          Password
        </label>
        {errors.password && (
          <div className="alert alert-danger">
            {errors.password.type === "required" && (
              <span className="alert-message">Password is required</span>
            )}
            {errors.password.type === "minLength" && (
              <span className="alert-message">Password min length is 4</span>
            )}
          </div>
        )}
      </div>

      <div className="form-group">
        <input
          ref={register({
            required: true,
            minLength: 4,
            validate: { sameAs: sameAs("password", getValues) },
          })}
          name="passwordConfirmation"
          type="password"
          className="form-control form__input"
          id="registerPasswordConfirmation"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="registerPasswordConfirmation">
          Password Confirmation
        </label>
        {errors.passwordConfirmation && (
          <div className="alert alert-danger">
            {errors.passwordConfirmation.type === "required" && (
              <span className="alert-message">
                Password confirmation is required
              </span>
            )}
            {errors.passwordConfirmation.type === "minLength" && (
              <span className="alert-message">
                Password confirmation min length is 4
              </span>
            )}
            {errors.passwordConfirmation.type === "sameAs" && (
              <span className="alert-message">
                Password confirmation must be the same as password
              </span>
            )}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-secondary">
        Submit
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
