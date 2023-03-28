import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/Frame.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        password,
        password_confirmation,
      };
      await axios.post("http://localhost:8000/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} position="top-center" />
      <div className="container navbar-div">
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <h3>Asset Management system</h3>
            <p className="pb-3">Login and enjoy the features</p>
            <div className="txt_field">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span></span>
              <label>Name</label>
            </div>
            <div className="txt_field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
              <label>Email</label>
            </div>
            <div className="txt_field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span></span>
              <label>Password</label>
            </div>
            <div className="txt_field">
              <input
                type="password"
                value={password_confirmation}
                onChange={(e) => setPassword_confirmation(e.target.value)}
              />
              <span></span>
              <label>Confirm Password</label>
            </div>
            <div className="row">
              {/* <GoogleLogin
              clientId="GooGle Id"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host"
            /> */}
              <div className="col-12">
                <button type="submit" className="click-button registerbutton">
                  Register
                </button>
                <div className="signup_link">
                  Already a member?{" "}
                  <Link className="nav-link" to={"/"}>
                    Login
                  </Link>
                </div>
              </div>
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

export default Signup;
