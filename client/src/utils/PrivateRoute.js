import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...theRest }) => {
    return (
      <Route
        {...theRest}
        render={() => {
          if (localStorage.getItem("token")) {
            return <Component />;
          } else {
            console.log(
              "Privateroute.js: Privateroute: Route.render: redirecting!"
            );
            return <Redirect to="/bubble-page" />;
          }
        }}
      />
    );
  };
  
  export default PrivateRoute;