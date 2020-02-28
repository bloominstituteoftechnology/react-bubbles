import React from "react";
import {Link} from "react-router-dom";


const Home = () => {
    return(
        <div>
        <Link to="/">Home</Link>
         <Link to='/login'>Login</Link>

         <div className="intro">
         <h1>Welcome to the Bubble App!</h1>
         </div>
        </div>
    )
}
export default Home;