import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.scss";
import NavLogo from "../../assets/NavbarLogo.png";
import UserLogo from "../../assets/UserLogo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollDashboard = () => {
    navigate("/home");
  };
  //  const scrollToProjects = () => {
  //   const projects = document.getElementById("projects");
  //   projects.scrollIntoView({ behavior: "smooth", block: "center" });
  // };
  // const scrollToContactForm = () => {
  //   const contactForm = document.getElementById("contactForm");
  //   contactForm.scrollIntoView({ behavior: "smooth", block: "center" });
  // };
  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-light navbar-expand-lg navbar-main">
          <div className="container">
            <Link
              className="navbar-brand"
              to="/"
              style={{ fontWeight: "bold" }}
            >
              <img className="navLogo" src={NavLogo} alt="" />
              Oversight
            </Link>
            <button
              className="navbar-toggler "
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto d-flex align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    &#9881; Settings
                  </Link>
                </li>

                <li className="nav-item">
                  <span className="nav-link d-flex justify-content-center align-items-center loginButton">
                    <div className="" style={{ paddingRight: "10px" }}>
                      Account
                    </div>
                    <img src={UserLogo} alt="" width={"30px"} />
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link">
                    <button onClick={logout} className="loginButton">
                      &#10503;
                    </button>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="navbar-lower">
          <div className="navbar-links container">
            <p onClick={scrollDashboard}>Dashboard</p>
            <p>Responses</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
