import React, { useState } from "react";
import { BrowserRouter as Router, Route,Link} from "react-router-dom";
import axiosWithAuth from "./axiosWithAuth"
import Login from "./components/Login";
import "./styles.scss";
import ProtectedRoute from "./ProtectedRoute"
import BubblePage from "./components/BubblePage"

function App() {
  // // useEffect(()=> {
  //   axiosWithAuth().get("http://localhost:5000")
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))
  // // },[])
  
  
  return (
    <Router>
      <div className="App">
<Link to="/login">login</Link>
<Link to="/BubblesPage">BubblePage</Link>
        <Route exact path="/login" component={Login} />
        <Route exact path="/BubblesPage" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
