import React from "react";
import styled from "styled-components";

const Input = styled.input``;

function Field({ expression, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <input
            type="text"
            placeholder="Info input"
            value={expression}
            onChange={onChange}
          />
        </div>
      </div>
      <div>
        <button>Visualise</button>
      </div>
    </form>
  );
}

export default Field;
