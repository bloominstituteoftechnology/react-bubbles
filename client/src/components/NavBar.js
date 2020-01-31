import React from 'react'
import {  Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div >
      <nav style={{display: "flex", flexDirection: "column"}}>
        <span>
          <Link to="/login">Login</Link>
        </span>
        <span>
          <Link to="/bubbles">Bubbles</Link>
        </span>
        </nav>
    </div>
  )
}

export default NavBar
