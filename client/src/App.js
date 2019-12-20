import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

function App() {

  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3333/items')
      .then(res => setItems(res.data))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
          <Switch>
            <PrivateRoute path="/protected" component={BubblePage} />
            <Route path="/login" component={Login} />
            <Route component={Login} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
