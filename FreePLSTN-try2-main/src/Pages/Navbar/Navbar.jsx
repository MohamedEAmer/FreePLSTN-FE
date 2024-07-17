import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUpload, FaFileSignature } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { LuFileBarChart2 } from "react-icons/lu";
import { IoSettings, IoLogOut } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import "./Navbar.css";

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const showSidebar = () => {
    setSidebarVisible(true);
  };

  const hideSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <nav className="navbar">
      <ul
        className="sidebar"
        style={{ display: sidebarVisible ? "flex" : "none" }}
      >
        <li onClick={hideSidebar}>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </a>
        </li>
        <li>
          <NavLink activeclassName="active" to="/dashboard">
            <FaHome className="icons" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink activeclassName="active" to="/create-exam">
            <FaFileSignature className="icons" />
            Create
          </NavLink>
        </li>
        <li>
          <NavLink activeclassName="active" to="/upload-exam">
            <FaUpload className="icons" />
            Upload
          </NavLink>
        </li>

        <li>
          <NavLink activeclassName="active" to="/profile">
            <BsPersonCircle className="icons" />
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink activeclassName="active" to="/logout">
            <IoLogOut className="icons" />
            Logout
          </NavLink>
        </li>
      </ul>

      <ul className="topbar">
        <li className="to-hide">
          <NavLink activeclassName="active" to="/dashboard">
            <FaHome className="icons" />
            Dashboard
          </NavLink>
        </li>
        <li className="to-hide">
          <NavLink activeclassName="active" to="/create-exam">
            <FaFileSignature className="icons" />
            Create
          </NavLink>
        </li>
        <li className="to-hide">
          <NavLink activeclassName="active" to="/upload-exam">
            <FaUpload className="icons" />
            Upload
          </NavLink>
        </li>

        <li className="to-hide">
          <NavLink activeclassName="active" to="/profile">
            <BsPersonCircle className="icons" />
            Profile
          </NavLink>
        </li>

        <li className="to-hide">
          <NavLink activeclassName="active" to="/logout">
            <IoLogOut className="icons" />
            Logout
          </NavLink>
        </li>
        <li className="to-show" onClick={showSidebar}>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
