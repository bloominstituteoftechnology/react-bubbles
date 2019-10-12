import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import SplashPage from "./components/SplashPage.js";
import PrivateRoute from "./PrivateRoute";
import BubblePage from "./components/BubblePage"
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
      <Route exact path="/" component={SplashPage} />
        <Route exact path="/login" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */
     <PrivateRoute path='/bubblepage' component={BubblePage} />
       }
      </div>
    </Router>
  );
}

export default App;
