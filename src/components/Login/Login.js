import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/Frame.png";
import axios from "axios";
import "./Login.scss";
import NavLogo from "../../assets/NavbarLogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        email: email,
        password: password,
      });
      // console.log(data);
      const response = await axios.post("http://localhost:8000/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data.token;
      window.localStorage.setItem("token", token);

      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <nav className="navbar navbar-light navbar-expand-lg navbar-main">
        <div className="container">
          <Link className="navbar-brand" to="/" style={{ fontWeight: "bold" }}>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  &#9881; Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="navbar-lower">
        <div className="navbar-links container">
          <hr></hr>
        </div>
      </div>
      <div className="container navbar-div">
        <div className="form-container">
          <form id="login-form" onSubmit={onSubmit}>
            <h3>Asset Management system</h3>
            <p className="pb-3">Login and enjoy the features</p>
            <div className="txt_field">
              <input
                type="text"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span></span>
              <label>Email</label>
            </div>
            <div className="txt_field">
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span></span>
              <label>Password</label>
            </div>
            <div className="pass">Forgot Password?</div>
            <button
              type="submit"
              id="login-button"
              className="click-button"
              value="Login"
            >
              Login
            </button>
            <div className="signup_link">
              Not a member?
              <Link className="nav-link" to={"/signup"}>
                Register
              </Link>
            </div>
          </form>
        </div>
        <div className="image-container">
          <img className="img" src={LoginImage} alt="" width={"450px"} />
        </div>
      </div>
      <div className="navbar-lower">
        <div className="navbar-links container">
          <br></br>
        </div>
      </div>
    </>
  );
};

export default Login;
