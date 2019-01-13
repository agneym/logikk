import React, { Component } from "react";

import Content from "./Content";
import "uikit/dist/css/uikit.css";
import "./App.css";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
