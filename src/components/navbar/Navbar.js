import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import NavLogo from "../../assets/NavbarLogo.png";
import UserLogo from "../../assets/UserLogo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollDashboard = () => {
    navigate("/home");
  };
  const scrollResponse = () => {
    navigate("/ticket");
  };

  const logoutt = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const location = useLocation();

  return (
    <>
      <div>
        <nav className="navbar navbar-light navbar-expand-lg navbar-main">
          <div className="container">
            <Link
              className="navbar-brand"
              to="/home"
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
                {/* {username ?? ( */}
                <li className="nav-item pl-3">
                  <span className="nav-link d-flex justify-content-center align-items-center loginButton">
                    <div className="" style={{ paddingRight: "10px" }}>
                      Account
                    </div>
                    <img src={UserLogo} alt="" width={"30px"} />
                  </span>
                </li>
                {/* )} */}
                <li className="nav-item">
                  <span className="nav-link">
                    <button onClick={logoutt} className="loginButton">
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
            <p
              style={
                location.pathname == "/home"
                  ? { borderBottom: "4px solid white" }
                  : {}
              }
              onClick={scrollDashboard}
            >
              Assets
            </p>
            {/* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */}
            <p
              style={
                location.pathname == "/ticket"
                  ? {
                      borderBottom: "4px solid white",
                    }
                  : {}
              }
              onClick={scrollResponse}
            >
              Tickets
            </p>
            <p onClick={scrollResponse}>Pending Aprrovals</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
