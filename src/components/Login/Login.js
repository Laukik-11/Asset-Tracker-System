import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/Frame.png";
import axios from "axios";
import "./Login.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        email: email,
        password: password,
      });

      const response = await axios.post(
        `${process.env.REACT_APP_URL}login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("user", response.data.user);

      navigate("/home", { replace: true });
    } catch (error) {
      // toast.error(error.response.data.message);
      // setError(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} position="top-center" />
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
              {/* <span></span> */}
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
              {/* <span></span> */}
              <label>Password</label>
            </div>
            {error ? (
              <p className="text-danger" style={{ fontSize: "12px" }}>
                {error}
              </p>
            ) : (
              <></>
            )}

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
    </>
  );
};

export default Login;
