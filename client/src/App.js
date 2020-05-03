import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./utlis/PrivateRoute"

import BubblePage from "./components/BubblePage"

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
        <div className="App">
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/bubble">
                <BubblePage />
            </PrivateRoute>
        </div>
    </Router>
  );
}

export default App;
