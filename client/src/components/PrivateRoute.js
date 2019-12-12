import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../utilities/axios";

export default function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={componentProps => {
        if (getToken()) {
          return <Component {...componentProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}