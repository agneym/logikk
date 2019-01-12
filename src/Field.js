import React from "react";

function Field({ expression, onChange, onSubmit }) {
  return (
    <form className="level" onSubmit={onSubmit}>
      <div className="field level-item">
        <div className="control">
          <input
            className="input is-info"
            type="text"
            placeholder="Info input"
            value={expression}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="field level-item">
        <button className="button is-primary">Visualise</button>
      </div>
    </form>
  );
}

export default Field;
