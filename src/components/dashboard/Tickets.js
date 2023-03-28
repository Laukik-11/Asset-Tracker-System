import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "../../assets/AddIcon.png";
import axios from "axios";

const Response = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState([]);
  const [status, setStatus] = useState(false);
  const token = window.localStorage.getItem("token");
  let isRun = useRef(false);

  const time = (savedTime) => {
    const formatedDate = new Date(savedTime).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return formatedDate;
  };

  useEffect(() => {
    if (!isRun) return;
    isRun.current = true;
    axios
      .get(`${process.env.REACT_APP_URL}/getticket`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setResponse(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);
  const updateStatus = (id) => {
    const token = window.localStorage.getItem("token");
    axios
      .patch(`${process.env.REACT_APP_URL}/updateticket/${id}`, id, {
        headers: { authorization: `bearer ${token}` },
      })
      .then(() => {
        setStatus((prev) => (prev = !prev));
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      });
  };

  const AddRequest = () => navigate("/newticket");

  return (
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
            <th>S.no.</th>
            <th>Ticket</th>
            <th>Item Name</th>
            <th>Time</th>
            <th>Description</th>
            <th>Status</th>

            {/* <th>Timestamp</th> */}
          </tr>
        </thead>
        <tbody>
          {response &&
            response
              .slice(0)
              .reverse()
              .map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{items.title}</td>
                    <td>{items.item.name}</td>
                    <td>{time(items.item.timestamp)} </td>
                    <td>{items.description}</td>
                    {items.status === 0 ? (
                      <td className="btn-outline-danger">On Hold</td>
                    ) : (
                      <td className="btn-outline-success">Solved</td>
                    )}

                    {token ? (
                      !items.status ? (
                        <td>
                          <button
                            onClick={() => updateStatus(items._id)}
                            className="btn btn-outline-info"
                          >
                            &#10003;
                          </button>
                        </td>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default Response;
