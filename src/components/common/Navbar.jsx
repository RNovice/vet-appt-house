import React from "react";
import { NavLink } from "react-router-dom";
import logoSvg from "@/assets/images/logo.svg";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg position-sticky top-0">
      <div className="container">
        <NavLink className="brand" to="/">
          <img src={logoSvg} alt="預獸屋 Logo" />
          預獸屋
        </NavLink>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="link" to="/">
                搜尋獸醫
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="link" to="/">
                快速預約
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="link" to="/">
                最新消息
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="link" to="/">
                關於我們
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="link" to="/">
                寵物管理
              </NavLink>
            </li>
          </ul>
          <NavLink className="link login-btn" to="/auth/login">
            登入
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
