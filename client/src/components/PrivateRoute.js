import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...routeProps }) => {
   return (
       <Route 
        {...routeProps}
        render= {() => {
            if (localStorage.getItem('token')) {
                return <Component/>
            } else {
                return <Redirect to='/' />
            }
        }}
       />
   );
}; 