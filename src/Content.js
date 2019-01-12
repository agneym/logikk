import React, { Component } from "react";

import Field from "./Field";
import Evaluator from "./Evaluator";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: "",
      evaluate: false
    };
  }
  onChangeExpression = event => {
    const expression = event.target.value;
    this.setState({
      expression,
      evaluate: false
    });
  };
  onVisualise = event => {
    event.preventDefault();
    this.setState({
      evaluate: true
    });
  };
  render() {
    const { expression, evaluate } = this.state;
    return (
      <main className="section">
        <div className="container">
          <Field
            expression={expression}
            onChange={this.onChangeExpression}
            onSubmit={this.onVisualise}
          />
        </div>
        <section className="section">
          {evaluate && <Evaluator expression={expression} key={expression} />}
        </section>
      </main>
    );
  }
}

export default Content;
