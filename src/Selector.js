import React from "react";

function Selector({ name, value, onChange }) {
  const handler = event => onChange(name, event.target.value);
  return (
    <td>
      <div className="uk-form-controls uk-form-controls-text">
        <label className="radio-button">
          <input
            className="uk-radio"
            type="radio"
            name={name}
            value="correct"
            checked={value === "correct"}
            onChange={handler}
          />
          ✔
        </label>
        <label className="radio-button">
          <input
            className="uk-radio"
            type="radio"
            name={name}
            value="wrong"
            checked={value === "wrong"}
            onChange={handler}
          />
          ✘
        </label>
        <label className="radio-button">
          <input
            className="uk-radio"
            type="radio"
            name={name}
            value="all"
            checked={value === "all"}
            onChange={handler}
          />
          All
        </label>
      </div>
    </td>
  );
}

export default Selector;
