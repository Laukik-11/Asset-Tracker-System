import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "../../assets/AddIcon.png";
import HeroImage from "../../assets/HeroImage.png";
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
      .get("http://localhost:8000/getrequest", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setData(res.data.asset);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
              <th>User</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{items.user.name}</td>
                    <td>{items.item.name}</td>
                    <td>{items.quantity}</td>
                    <td>{items.reason}</td>
                    <td>{time(items.timestamp)} </td>
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
