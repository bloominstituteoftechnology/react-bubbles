import React from "react";
import { Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  return (

      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/bubble-page" component={BubblePage} />
      </div>

  );
}

export default App;
