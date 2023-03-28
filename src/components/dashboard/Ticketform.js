import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DashBoard.scss";

const Ticketform = () => {
  const navigate = useNavigate();

  const [dataa, setData] = useState([]);

  const [state, setState] = useState({
    title: "",
    date: "",
    description: "",
    asset: "",
    status: 0,
  });
  const [user, setUser] = useState({
    user: { name: "" },
    serialnumber: "",
    dop: "",
  });
  const token = window.localStorage.getItem("token");

  const onOptionChangeHandler = async (event) => {
    console.log("User Selected Value - ", event.target.value);
    setState((prevProps) => ({
      ...prevProps,
      asset: event.target.value,
    }));
    const token = window.localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_URL}/getassetdata`,
        { data: event.target.value },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/getasset`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/addticket", state, {
        headers: { authorization: `bearer ${token}` },
      });
      alert("Successfully requested");
      navigate("/ticket");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container request">
        <h4 className="p-2">Make a new request :</h4>
        <div className="request-box">
          <form>
            <div className="form-control">
              <label>Title :</label>
              <input
                type="text"
                name="title"
                value={state.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-control">
              <label>Asset :</label>
              <select onChange={onOptionChangeHandler}>
                <option>Please choose one option</option>
                {dataa &&
                  dataa.map((option, index) => {
                    return <option key={index}>{option.name}</option>;
                  })}
              </select>
            </div>
            <div className="form-control">
              <label>Employee :</label>
              <input readOnly type="text" name="asset" value={user.user.name} />
            </div>
            <div className="form-control">
              <label>Serial Number :</label>
              <input
                readOnly
                type="text"
                name="asset"
                value={user.serialnumber}
              />
            </div>
            <div className="form-control">
              <label>Issue Date :</label>
              <input readOnly type="text" name="asset" value={user.dop} />
            </div>
            <div className="form-control">
              <label>date :</label>
              <input
                type="date"
                name="date"
                value={state.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label>Description of Product :</label>
              <textarea
                style={{ height: "auto" }}
                rows="3"
                type="text"
                name="description"
                value={state.description}
                onChange={handleInputChange}
              />
            </div>
            <span className="d-flex justify-content-center align-items-center searchButton  mx-auto">
              <div className="" type="submit" onClick={handleSubmit}>
                Request
              </div>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Ticketform;
