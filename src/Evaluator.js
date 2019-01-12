import React from "react";
import * as acorn from "acorn";
import walkTree from "./utils/walkTree";

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { expression } = this.props;
    try {
      const node = acorn.parse(expression).body[0];
      const identifiers = walkTree(node);
      console.log(identifiers);
    } catch (err) {
      console.log(err);
    }
    return null;
  }
  render() {
    return <React.Fragment />;
  }
}

export default Evaluator;
