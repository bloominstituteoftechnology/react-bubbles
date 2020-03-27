// Purpose -> replace the <Route /> in our routing setup for any routes that should be protected.

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // fancy JS to pull the component prop out of the props obj
  // use the ...rest operator
  // rename component to Component
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('token')) {
          // user is authed
          return <Component {...props} />;
        } else {
          // user not authed - redirect to /login
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
