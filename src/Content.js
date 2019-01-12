import React, { Component } from "react";

import Field from "./Field";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: ""
    };
  }
  onChangeExpression = event => {
    const expression = event.target.value;
    this.setState({
      expression
    });
  };
  onVisualise = () => {};
  render() {
    const { expression } = this.state;
    return (
      <main className="section">
        <div className="container">
          <Field
            expression={expression}
            onChange={this.onChangeExpression}
            onSubmit={this.onVisualise}
          />
        </div>
      </main>
    );
  }
}

export default Content;
