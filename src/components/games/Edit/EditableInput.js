import React, { useState } from "react";
import { displayDate } from "components/helpers";

const EditableInput = ({ type, entity, field, className, onUpdate }) => {
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
          <input
            type={type}
            onChange={handleChange}
            className={className}
            value={value}
          />
          <span className="btn-container">
            <button onClick={update} className="btn btn-success btn-editable">
              SAVE
            </button>
            <button
              onClick={disableInput}
              className="btn btn-danger btn-editable"
            >
              CANCEL
            </button>
          </span>
        </>
      );
    }

    return (
      <>
        <span className={className}>{type === "date" ? dateValue : value}</span>
        <span className="btn-container">
          <button
            onClick={activateInput}
            className="btn btn-warning btn-editable"
          >
            EDIT
          </button>
        </span>
      </>
    );
  };

  return <div>{renderComponentView()}</div>;
};

export default EditableInput;
