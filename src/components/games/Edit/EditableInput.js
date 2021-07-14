import React, { useState } from "react";
import { displayDate } from "components/helpers";

const EditableInput = ({ type, entity, field, onUpdate }) => {
  const [dateValue, setDateValue] = useState(displayDate(entity[field]));
  const [value, setValue] = useState(entity[field]);
  const [originValue, setOriginValue] = useState(entity[field]);
  const [isActiveInput, setIsActiveInput] = useState(false);

  const activateInput = () => setIsActiveInput(true);
  const disableInput = () => {
    setIsActiveInput(false);
    setValue(originValue);
  };

  const handleChange = (e) => setValue(e.target.value);

  const update = () => {
    if (value !== originValue) {
      onUpdate(
        { [field]: value },
        () => {
          setIsActiveInput(false);
          setOriginValue(value);
          type === "date" && setDateValue(displayDate(value));
        },
        () => {
          setIsActiveInput(false);
          setValue(originValue);
        }
      );
    }
  };

  const renderComponentView = () => {
    if (isActiveInput) {
      return (
        <>
          <span className="btn-container">
            <button
              onClick={update}
              className="btn btn-success btn-editable mr-2"
            >
              SAVE
            </button>
            <button
              onClick={disableInput}
              className="btn btn-danger btn-editable mr-2"
            >
              CANCEL
            </button>
          </span>
          <input
            type={type}
            onChange={handleChange}
            className="edit__input"
            value={value}
          />
        </>
      );
    }

    return (
      <>
        <button onClick={activateInput} className="btn btn-warning ml-2">
          {`EDIT ${field === "maxParticipants" ? "max" : field}`}
        </button>
        <span className="info__description-text">
          {type === "date" ? dateValue : value}
        </span>
        <span className="btn-container"></span>
      </>
    );
  };

  return <div className="edit">{renderComponentView()}</div>;
};

export default EditableInput;
