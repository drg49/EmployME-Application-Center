import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faBriefcase, faClipboard, faSearch } from '@fortawesome/free-solid-svg-icons'
import "./index.scss"

const findJobsIcon = <FontAwesomeIcon icon={faSearch} color="gray" size="md" />;
const postJobsIcon = <FontAwesomeIcon icon={faClipboard} color="gray" size="md" />;
const careersIcon = <FontAwesomeIcon icon={faBriefcase} color="gray" size="md" />;
const userIcon = <FontAwesomeIcon icon={faUserTie} color="gray" size="md" />;

export default function NavBar() {
  return (
    <nav>
      <Link to="/">
        <p id="logo">EmployME</p>
      </Link>
      <ul>
        <li>
          <Link to="/search">Find Jobs {findJobsIcon}</Link>
        </li>
        <li>
          <Link>Post Jobs {postJobsIcon}</Link>
        </li>
        <li>
          <Link>Careers {careersIcon}</Link>
        </li>
        <li>
          <Link to="/my-profile">My Profile {userIcon}</Link>
        </li>
      </ul>
    </nav>
  )
}
