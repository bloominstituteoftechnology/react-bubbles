// Build a PrivateRoute component and use it to protect a route that renders the BubblesPage component
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (localStorage.getItem("token")) {
					return <Component {...props} />;
				} else {
					return <Redirect to="/login/" />;
				}
			}}
		/>
	);
};

/*
Because this confused me at first, I wanted to add this as reference for the future: 

To give an accurate explanation, let's break down the { component: Component, ...rest } expression into two separate operations:

Operation 1: Find the component property defined on props (Note: lowercase component) and assign it to a new location in state we call Component (Note: capital Component).
Operation 2: Then, take all remaining properties defined on the props object and collect them inside an argument called rest.
The important point is that you're NOT renaming props to rest. (And nor does it have to do with trying to "avoid naming issues with the props passed to the Route render function".)

rest === props;
// => false
Your simply pulling off the rest (hence why the argument is named that) of the properties defined on your props object into a new argument called rest.
*/
export default PrivateRoute; 