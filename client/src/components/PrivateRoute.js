import React from 'react';
import {Route, Redirect} from 'react-router-dom';

//PrivateRoute Rules:
//1. has the same API as <Route/>
//2. renders a <Route/>  and passes through it all props
//3. checks if user is authenticated and renders 'component' prop if so.

//"component: Component" this is renaming the destructured prop. This prop part is the API(just destructured).

const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render={props=> {
            if(localStorage.getItem('token')){
                return <Component {...props}/>
            } else {
                return <Redirect to ='/'/>
            }
        }}
    />
)}

export default PrivateRoute;