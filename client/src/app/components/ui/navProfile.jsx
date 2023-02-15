import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users";

const NavProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = useSelector(getCurrentUser());

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!currentUser) return "loading...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>

        <img
          src={currentUser.image}
          alt="user logo"
          className="img-responsive rounded-circle"
          width="30"
          height="30"
        />
      </div>

      <div className={`w-100 dropdown-menu ${isOpen ? "show" : ""}`}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>

        <Link to={"/logout"} className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
