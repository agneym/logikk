import React from "react";

function Field() {
  return (
    <form className="level">
      <div className="field level-item">
        <div className="control">
          <input
            className="input is-info"
            type="text"
            placeholder="Info input"
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
