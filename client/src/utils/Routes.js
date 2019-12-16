import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/Login';
import BubblePage from '../components/BubblePage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

const Routes = () => {
  return (
    <div className="routes">
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/bubble-page" component={BubblePage} />
    </div>
  );
}

export default Routes;