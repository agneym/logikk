import React from "react";

function Selector({ name, value }) {
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
          />
          All
        </label>
      </div>
    </td>
  );
}

export default Selector;
