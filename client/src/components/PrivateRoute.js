import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
    const { 
        component: Component, 
        ...restOfProps
        } = props;

        return (
            <Route
                {...restOfProps} render={(renderProps) => {
                    if (localStorage.getItem(`token`)) {
                        return <Component {...renderProps} />;
                    } else {
                        return <Redirect to='/' />;
                    }
                }}
            />
        );
};

export default PrivateRoute;