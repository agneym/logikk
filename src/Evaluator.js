import React from "react";
import * as acorn from "acorn";

import walkTree from "./utils/walkTree";
import createMatrix from "./utils/createMatrix";
import identifyResults from "./utils/identifyResults";
import createSelectors from "./utils/createSelectors";
import Selector from "./Selector";
import createFilter from "./utils/createFilter";

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifiers: [],
      error: "",
      matrix: [],
      selectors: {}
    };
    this.originalMatrix = [];
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
      const selectors = createSelectors(identifiers);
      this.originalMatrix = answerMatrix;

      this.setState({
        identifiers,
        matrix: answerMatrix,
        selectors
      });
    } catch (err) {
      this.setState({
        error: err
      });
    }
  };
  changeSelector = (name, value) => {
    this.setState(
      prevState => ({
        selectors: {
          ...prevState.selectors,
          [name]: value
        }
      }),
      () => {
        const matrix = createFilter(this.state.selectors, this.originalMatrix);
        this.setState({
          matrix
        });
      }
    );
  };
  render() {
    const { identifiers, matrix, selectors } = this.state;
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
            <tr>
              {new Array(matrix[0] ? matrix[0].length : 0)
                .fill(1)
                .map((a, index) => {
                  const id = `${identifiers[index] || "result"}-${index}`;
                  return (
                    <Selector
                      key={index}
                      name={id}
                      value={selectors[id]}
                      onChange={this.changeSelector}
                    />
                  );
                })}
            </tr>
            {matrix.map((row, index) => (
              <tr key={index}>
                {row.map((value, index) => (
                  <td key={index}>{Boolean(value).toString()}</td>
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
