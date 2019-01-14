import React, { Component } from "react";

import Content from "./Content";
import "uikit/dist/css/uikit.css";
import "./App.css";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <a
          href="https://github.com/BoyWithSilverWings"
          className="uk-visible@m"
        >
          <img
            className="ribbon"
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
            alt="Fork me on GitHub"
          />
        </a>
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
