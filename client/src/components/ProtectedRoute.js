import React from "react";
import { Route, Redirect } from "react-router-dom";

import BubblePage from "./BubblePage";

export default function ProtectedRoute({ component: Component, ...rest }) {
  let loggedIn = localStorage.getItem("token");

  return (
    <Route {...rest}>
      {loggedIn ? <BubblePage /> : <Redirect to="/login" />}
    </Route>
  );
}
