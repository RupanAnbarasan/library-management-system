import "./usernav.css";
import logout from "../../../img/logout.png";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserNav = ({ prop }) => {
  const user = useSelector(state => state.login?.role)
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="user-nav-container">
      <div className="user-nav-container1">
        <h2 className="pageTitle">{prop.PageTitle}</h2>

        <div
          className={`hamburger-menu ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>

          <ul className={`user-nav-ul  ${isOpen ? "open" : ""}`}>
            <li
              tabIndex="0"
              className={`user-nav-li home${prop.classname}`}
              onClick={() => nav(`/userdashboard`)}
            >
              Home
            </li>
            <li
              tabIndex="0"
              className={`user-nav-li catalog${prop.classname}`}
              onClick={() => nav(`/catalog`)}
            >
              Catalog
            </li>
            <li
              tabIndex="0"
              className={`user-nav-li transaction${prop.classname}`}
              onClick={() => nav(`/personalTransaction`)}
            >
              My transaction
            </li>
            <li tabIndex="0" className="user-nav-li" onClick={() => nav("/")}>
              <img className="logout" src={logout} alt="log out" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
