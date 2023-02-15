import React from "react";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <nav className="navbar mb-3 bg-light">
      <div className="container-fluid">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className={"nav-link"} aria-current="page" to="/">
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className={"nav-link"} aria-current="page" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>

        <div className="d-flex">
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
