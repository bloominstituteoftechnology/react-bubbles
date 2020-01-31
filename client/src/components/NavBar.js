import React from 'react'
import {  Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div >
      <nav style={{display: "flex", flexDirection: "column"}}>
        <a>
          <Link to="/login">Login</Link>
        </a>
        <a>
          <Link to="/bubbles">Bubbles</Link>
        </a>
        </nav>
    </div>
  )
}

export default NavBar
