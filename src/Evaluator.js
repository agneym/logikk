import React, { Fragment } from "react";
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
      selectors: {},
      representation: "bool"
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
      console.error(err);
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
  changeRep = event => {
    const value = event.target.value;
    this.setState({
      representation: value
    });
  };
  renderRep(value) {
    const { representation } = this.state;
    switch (representation) {
      case "bool": {
        return Boolean(value).toString();
      }
      case "icon": {
        return Boolean(value) ? "✔" : "✘";
      }
      default: {
        return Boolean(value).toString();
      }
    }
  }
  renderError() {
    return (
      <div className="uk-section uk-dark uk-text-center">
        <h5>Please enter a valid logical expression</h5>
        <sub>
          For eg: <pre className="uk-width-1-4 uk-margin-auto">a&&b</pre>
        </sub>
        <p className="uk-text-small">
          <span>If you think this is a bug, please file an &nbsp;</span>
          <a
            href={`https://github.com/BoyWithSilverWings/logikk/issues/new?&body=${
              this.state.error
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Issue
          </a>
        </p>
      </div>
    );
  }
  render() {
    const {
      identifiers,
      matrix,
      selectors,
      representation,
      error
    } = this.state;
    return (
      <Fragment>
        {error ? (
          this.renderError()
        ) : (
          <Fragment>
            <div className="uk-flex uk-flex-right uk-margin-right uk-margin-bottom">
              <select
                className="uk-select uk-form-small uk-form-width-small"
                value={representation}
                onChange={this.changeRep}
              >
                <option value="bool">Boolean</option>
                <option value="icon">Icons</option>
              </select>
            </div>
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
                        <td key={index}>{this.renderRep(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Evaluator;
