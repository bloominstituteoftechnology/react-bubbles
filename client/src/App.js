import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from '../src/components/PrivateRoute';
import BubblePage from './components/BubblePage';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <Switch>
      <div className="App">
        <Route exact path="/" component={Login} />
        
        <PrivateRoute>
          <Route path='/protected' component={BubblePage}/>
          
        </PrivateRoute>
        

      </div>
      </Switch>
    </Router>
  );
}

export default App;
