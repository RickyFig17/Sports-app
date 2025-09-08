import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h1>Navbar</h1>
      <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/matches">Matches</Link>
        </li>
         <li>
            <Link to="/tournament">Tournament</Link>
        </li>
         <li>
            <Link to="/standings">Standings</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
