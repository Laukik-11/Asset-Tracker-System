import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        password,
      };
      console.log(data);
      await axios.post("http://localhost:8000/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar-div">
        <form id="signupForm" onSubmit={onSubmit} encType="multipart/form-data">
          <div className="txt_field">
            <input
              type="text"
              id="signup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span></span>
            <label>Name</label>
          </div>
          <div className="txt_field">
            <input
              type="email"
              id="signup-email"
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
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className="row">
            <div className="col-12">
              <button
                type="submit"
                className="click-button registerbutton"
                id="register-button"
              >
                Register
              </button>
              <div className="signup_link">
                Already a member?{" "}
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
