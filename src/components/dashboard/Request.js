import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DashBoard.scss";
import Navbar from "../navbar/Navbar";

const Request = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    dop: "",
    serialnumber: "",
    assetsvalue: "",
    comments: "",
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
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_URL}/addasset`, state, {
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
      {/* <Navbar /> */}
      <div className="container request">
        <h4 className="p-2">New Product Issue :</h4>
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
              <label>Date :</label>
              <input
                type="date"
                name="dop"
                value={state.dop}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Serial Number :</label>
              <input
                type="number"
                name="serialnumber"
                value={state.serialnumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>AssetValue :</label>
              <input
                type="number"
                name="assetsvalue"
                value={state.assetsvalue}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Comments :</label>
              <textarea
                type="text"
                name="comments"
                value={state.comments}
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
