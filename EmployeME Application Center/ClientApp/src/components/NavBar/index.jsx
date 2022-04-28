import React from "react";
import { Link } from "react-router-dom";

import "./index.scss"

export default function NavBar() {
  return (
    <nav>
      <Link to="/">
        <p id="logo">EmployME</p>
      </Link>
      <ul>
        <li>
          <Link to="/search">Find Jobs</Link>
        </li>
        <li>
          <Link>Post Jobs</Link>
        </li>
        <li>
          <Link>Careers</Link>
        </li>
      </ul>
    </nav>
  )
}
