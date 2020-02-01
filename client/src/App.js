import React from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { getToken } from './utils/api';
import ProtectedRoute from './components/PrivateRoute';
import Login from "./components/Login";
import Logout from './components/Logout';
import BubblePage from './components/BubblePage';
import ColorList from './components/ColorList';

import "./styles.scss";

function App() {
  const signedIn = getToken()

  return (
    <Router>
      <div className="App">
        <nav> 
          <Link to='/'>Home</Link>
          {!signedIn && <Link to="/login">Login</Link>}
          {signedIn && <Link to="/logout">Logout</Link>}
          <Link to='/bubblepage'>Bubble Page</Link>
          <Link to='/colorlist'>Color List</Link>
        </nav>

        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}

        <ProtectedRoute exact path='/bubblepage' component={BubblePage} />
        <ProtectedRoute exact path='/colorlist' component={ColorList} />
        <ProtectedRoute exact path="/logout" component={Logout} />
      </div>
    </Router>
  );
}

export default App;
