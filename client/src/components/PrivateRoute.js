import React from 'react';
import {Route, Redirect} from 'react-router-dom';

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
  );

  //How do I add note?

  export default PrivateRoute;