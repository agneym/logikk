import React from "react";

function Selector({ name }) {
  return (
    <td>
      <div class="uk-form-controls uk-form-controls-text">
        <label className="radio-button">
          <input class="uk-radio" type="radio" name={name} />✔
        </label>
        <label className="radio-button">
          <input class="uk-radio" type="radio" name={name} />✘
        </label>
        <label className="radio-button">
          <input class="uk-radio" type="radio" name={name} />
          All
        </label>
      </div>
    </td>
  );
}

export default Selector;
