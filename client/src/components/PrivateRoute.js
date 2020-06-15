import React from 'react';
import {Route, Redirect} from 'react-router-dom';

//setting up the private route with the value of Component

const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={props =>{
            if(localStorage.getItem("token")) {
                return <Component {...props} />;
            } else{
                return <Redirect to="/"/>
            }
        }} />
    )
}
export default PrivateRoute;