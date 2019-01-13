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
      const identifiers = walkTree(ast.body[0]);
      const matrix = createMatrix(identifiers.length);
      const expressions = identifyResults(ast, matrix);
      const answerMatrix = matrix.map((row, index) => {
        // eslint-disable-next-line no-eval
        row.push(eval(expressions[index]));
        return row;
      });
      this.setState({
        identifiers,
        matrix: answerMatrix
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
      <div className="uk-overflow-auto result-table">
        <table className="uk-table uk-table-hover uk-table-middle uk-text-center">
          <thead>
            <tr>
              {identifiers.map((identifier, index) => (
                <th className="uk-text-center" key={index + identifier}>
                  {identifier}
                </th>
              ))}
              <td className="uk-text-bold uk-text-primary uk-text-center">
                RESULT
              </td>
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
      </div>
    );
  }
}

export default Evaluator;
