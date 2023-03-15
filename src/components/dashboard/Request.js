import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DashBoard.scss";
import Navbar from "../navbar/Navbar";

const Request = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    quantity: "",
    reason: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const token = window.localStorage.getItem("token");

  const handleSubmit = async (e) => {
    console.log(state);
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/createrequest", state, {
        headers: { authorization: `bearer ${token}` },
      });
      alert("Successfully requested");
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container request">
        <h4 className="p-2">Make a new request :</h4>
        <div className="request-box">
          <form>
            <div className="form-control">
              <label>Name of Product :</label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Quantity :</label>
              <input
                type="number"
                name="quantity"
                value={state.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Reason :</label>
              <textarea
                type="text"
                name="reason"
                value={state.reason}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className=" text-center pt-4"> */}
            <span className="d-flex justify-content-center align-items-center searchButton  mx-auto">
              <div className="" type="submit" onClick={handleSubmit}>
                Request
              </div>
            </span>
            {/* </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Request;
