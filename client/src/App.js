import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";


import Routes from './utils/Routes';

import "./styles.scss";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <Container>
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    </Container>
  );
}

export default App;