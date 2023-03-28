import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

import AddIcon from "../../assets/AddIcon.png";
import HeroImage from "../../assets/HeroImage.png";
import checkAuth from "../Login/checkAuth";
import axios from "axios";
import "./DashBoard.scss";

const DashBoard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("token");
  let isRun = useRef(false);

  useEffect(() => {
    if (!isRun) return;
    isRun.current = true;
    axios
      .get(`${process.env.REACT_APP_URL}/getasset`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // if (!checkAuth()) return navigate("/login ");

  // const openArticle = (id) => {
  //   axios.get;
  // };

  const time = (savedTime) => {
    const formatedDate = new Date(savedTime).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return formatedDate;
  };

  const AddRequest = () => navigate("/request");

  return (
    <>
      <div className="container dashboard">
        <div className="searchBox py-3">
          <form className="searchInput">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <span className="nav-link d-flex justify-content-center align-items-center searchButton">
            <img src={AddIcon} alt="" width={"25px"} />
            <div
              className=""
              style={{ paddingLeft: "10px" }}
              onClick={AddRequest}
            >
              Request
            </div>
          </span>
        </div>
        <table className="data-table" width={"100%"}>
          <thead>
            <tr>
              <th>S. no.</th>
              <th>Employee</th>
              <th>Product</th>
              <th>Date of Purchase</th>
              <th>Serial Number</th>
              <th>Timestamp</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/home/${items._id}`}>
                        {items.user.name.charAt(0).toUpperCase() +
                          items.user.name.slice(1)}
                      </Link>
                    </td>
                    <td>
                      {items.name.charAt(0).toUpperCase() + items.name.slice(1)}
                    </td>
                    <td>{items.dop}</td>
                    <td>{items.serialnumber}</td>
                    <td>{time(items.timestamp)} </td>
                    <td>{items.comments} </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {data ? (
          <></>
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img
                src={HeroImage}
                alt=""
                style={{ width: "300px", paddingTop: "4%" }}
              />
              <p className="pt-2">
                Please feel free to make a request if you have one. Currently,
                there are no requests in queue.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashBoard;
