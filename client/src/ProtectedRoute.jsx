import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export const ProtectedRoute = ({component: Component, ...restOfProps}) => {
        console.log(restOfProps.isLoggedIn);

    return(
    <Route {...restOfProps} render={props => (restOfProps.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />)} />
    )
}
