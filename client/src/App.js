import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<Router>
			<div className="App">
				{/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
				<Switch>
					<PrivateRoute exact path="/bubblepage" component={BubblePage} />
					<Route exact path="/" component={Login} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
