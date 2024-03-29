import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faBriefcase, faClipboard, faSearch, faPeopleGroup, faBell } from '@fortawesome/free-solid-svg-icons'
import "./index.scss"

const communityIcon = <FontAwesomeIcon icon={faPeopleGroup} color="gray" />;
const notifIcon = <FontAwesomeIcon icon={faBell} color="gray" />
const findJobsIcon = <FontAwesomeIcon icon={faSearch} color="gray" />;
const postJobsIcon = <FontAwesomeIcon icon={faClipboard} color="gray" />;
const careersIcon = <FontAwesomeIcon icon={faBriefcase} color="gray" />;
const userIcon = <FontAwesomeIcon icon={faUserTie} color="gray" />;

export default function NavBar() {
  return (
    <nav>
      <Link to="/">
        <p id="logo">EmployME</p>
      </Link>
      <ul>
        <li>
          <Link to="/community">Community {communityIcon}</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications {notifIcon}</Link>
        </li>
        <li>
          <Link to="/search">Find Jobs {findJobsIcon}</Link>
        </li>
        <li>
          <Link to="/post-jobs">Post Jobs {postJobsIcon}</Link>
        </li>
        <li>
          <Link to="/careers">Careers {careersIcon}</Link>
        </li>
        <li>
          <Link to="/my-profile">My Profile {userIcon}</Link>
        </li>
      </ul>
    </nav>
  )
}
