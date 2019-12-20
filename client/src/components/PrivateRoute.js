import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ Component: component, ...rest }) => {
  return (
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
};
