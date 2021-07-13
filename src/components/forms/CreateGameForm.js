import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import {
  checkInput,
  changeTypeToDate,
  changeTypeToTime,
  expandTextareaByTyping,
} from "components/helpers/inputs";

const CreateGameForm = ({ onSubmit }) => {
  const { register, errors, handleSubmit } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          ref={register({ required: true })}
          name="date"
          type="text"
          className="form__input"
          id="createDate"
          onFocus={changeTypeToDate}
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="createDate">
          Date
        </label>
        {errors.date && (
          <div className="alert alert-danger">
            {errors.date.type === "required" && <span>Date required</span>}
          </div>
        )}
      </div>
      <div className="form-group">
        <input
          ref={register({ required: true })}
          name="time"
          type="text"
          className="form__input"
          id="createTime"
          onFocus={changeTypeToTime}
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="createTime">
          Time
        </label>
        {errors.time && (
          <div className="alert alert-danger">
            {errors.time.type === "required" && <span>Time required</span>}
          </div>
        )}
      </div>
      <div className="form-group">
        <input
          ref={register({ required: true })}
          name="maxParticipants"
          type="number"
          className="form__input"
          id="createMax"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="createMax">
          Max Participants
        </label>
        {errors.maxParticipants && (
          <div className="alert alert-danger">
            {errors.maxParticipants.type === "required" && (
              <span>Maximum number of players required</span>
            )}
          </div>
        )}
      </div>
      <div className="form-group">
        <input
          ref={register({ required: true })}
          name="city"
          type="text"
          className="form__input"
          id="createCity"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="createCity">
          City
        </label>
        {errors.city && (
          <div className="alert alert-danger">
            {errors.city.type === "required" && <span>City required</span>}
          </div>
        )}
      </div>
      <div className="form-group">
        <input
          ref={register({ required: true })}
          name="address"
          type="text"
          className="form__input"
          id="createStreet"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="createStreet">
          Place
        </label>
        {errors.address && (
          <div className="alert alert-danger">
            {errors.address.type === "required" && <span>Street required</span>}
          </div>
        )}
      </div>
      <div className="form-group">
        <input
          ref={register({ required: true })}
          name="price"
          type="number"
          className="form__input"
          id="createPrice"
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="createPrice">
          Price
        </label>
        {errors.price && (
          <div className="alert alert-danger">
            {errors.price.type === "required" && <span>Price required</span>}
          </div>
        )}
      </div>
      <div className="form-group">
        <textarea
          ref={register({ required: true })}
          name="description"
          className="form__input form__textarea"
          id="createDesc"
          onInput={expandTextareaByTyping}
          onBlur={checkInput}
        />
        <label className="form__label" htmlFor="createDesc">
          Description
        </label>
      </div>

      <button type="submit" className="btn btn-secondary">
        Submit
      </button>
    </form>
  );
};

CreateGameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateGameForm;
