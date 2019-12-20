import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

function App() {

  const [colors, setColors] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3333/items')
      .then(res => setColors(res.data))
      .catch(error => console.log('get err', error));

    axios
      .post('http://localhost:3333/items')
      .then(res => setColors(res.data))
      .catch(error => console.log('post er', error));

    axios
      .delete('http://localhost:3333/items')
      .then(res => setColors(res.data))
      .catch(error => console.log('delete err', error));
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
