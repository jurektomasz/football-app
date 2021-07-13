import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import FormError from "./FormError";
import { EMAIL_PATTERN } from "components/helpers/validators";
import { checkInput } from "components/helpers/inputs";

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          ref={register({
            required: "Email is required",
            pattern: { value: EMAIL_PATTERN, message: "Invalid email format" },
          })}
          name="email"
          type="email"
          className="form-control form__input"
          id="loginEmail"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="loginEmail">
          Email address
        </label>

        <FormError errors={errors} name="email">
          {(message) => <p className="alert-message">{message}</p>}
        </FormError>
      </div>
      <div className="form-group">
        <input
          ref={register({
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password min length 4 characters",
            },
          })}
          name="password"
          type="password"
          className="form-control form__input"
          id="loginPassword"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="loginPassword">
          Password
        </label>
        <FormError errors={errors} name="password">
          {(message) => <p className="alert-message">{message}</p>}
        </FormError>
      </div>
      <button type="submit" className="btn btn-secondary btn--form">
        Submit
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
