import React from "react";
import UIKit from "uikit";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.times = 0;
    this.state = {
      showAlert: false
    };
  }
  componentDidMount() {
    this.times = +localStorage.getItem("count") || 0;
  }
  onSubmit = event => {
    event.preventDefault();
    this.times += 1;
    this.props.onSubmit();
    if (this.times === 5 || this.times === 20) {
      this.setState({
        showAlert: true
      });
    }
    localStorage.setItem("count", this.times);
  };
  render() {
    const { expression, onChange } = this.props;
    return (
      <form className="uk-form-blank" onSubmit={this.onSubmit}>
        <div>
          <div>
            <input
              className="uk-input uk-margin"
              type="text"
              placeholder="Enter Expression here"
              value={expression}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <button className="uk-button uk-button-danger uk-margin-auto uk-display-block uk-box-shadow-small">
            Visualise
          </button>
        </div>
        {this.state.showAlert && (
          <div
            data-uk-alert
            className="uk-text-primary uk-animation-slide-bottom-small"
          >
            <button
              className="uk-alert-close uk-button uk-button-link"
              data-uk-close
            />
            <p className="uk-text-emphasis">
              Do you like this? Would you like to share?{" "}
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/intent/tweet?text=Check%20out%20Logikk%20-%20A%20Logical%20Expression%20Visualiser&url=https%3A%2F%2Flogikk.netlify.com%2F`}
              data-uk-icon="icon: twitter"
              className="uk-margin-right uk-text-emphasis"
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/submit?title=Check%20out%20Logikk%20-%20A%20Logical%20Expression%20Visualiser&url=https%3A%2F%2Flogikk.netlify.com%2F"
              data-uk-icon="icon: reddit"
              className="uk-margin-right uk-text-emphasis"
            />
          </div>
        )}
      </form>
    );
  }
}

export default Field;
