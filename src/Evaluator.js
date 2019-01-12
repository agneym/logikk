import React from "react";
import * as acorn from "acorn";
import walkTree from "./utils/walkTree";
import createMatrix from "./utils/createMatrix";
import identifyResults from "./utils/identifyResults";

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifiers: [],
      error: "",
      matrix: []
    };
  }
  componentDidMount() {
    this.parseExpression();
  }
  parseExpression = () => {
    const { expression } = this.props;
    try {
      const ast = acorn.parse(expression);
      const node = ast.body[0];
      const identifiers = walkTree(node);
      const matrix = createMatrix(identifiers.length);
      const expressions = identifyResults(ast, matrix);
      console.log(expressions);
      this.setState({
        identifiers,
        matrix
      });
    } catch (err) {
      this.setState({
        error: err
      });
    }
  };
  render() {
    const { identifiers, matrix } = this.state;
    return (
      <table>
        <thead>
          <tr>
            {identifiers.map((identifier, index) => (
              <td key={index + identifier}>{identifier}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map(row => (
            <tr>
              {row.map(value => (
                <td>{Boolean(value).toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Evaluator;
