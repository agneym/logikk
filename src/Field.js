import React from "react";

function Field({ expression, onChange, onSubmit }) {
  return (
    <form className="uk-form-blank" onSubmit={onSubmit}>
      <div>
        <div>
          <input
            className="uk-input uk-margin"
            type="text"
            placeholder="Enter Expression here"
            value={expression}
            onChange={onChange}
          />
        </div>
      </div>
      <div>
        <button className="uk-button uk-button-danger uk-margin-auto uk-display-block uk-box-shadow-small">
          Visualise
        </button>
      </div>
    </form>
  );
}

export default Field;
