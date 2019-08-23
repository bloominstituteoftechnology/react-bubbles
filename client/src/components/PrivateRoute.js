import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({componenet: Component, ...rest}) => {
    return(
        <div>
             return <Route {...rest} render={ props => {
                if(localStorage.getItem('token')) {
                    return <Component {...props}/>
                } 
                else {
                    return <Redirect to="/" />
                }
            }}  
            />
        </div>
    )
}

export default PrivateRoute