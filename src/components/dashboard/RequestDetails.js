import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RequestDetails = () => {
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("token");
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/getrequest/${id}`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setRequest(res.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.get();
  }, []);
  console.log(request);
  return loading ? (
    <>
      <div className="container ">
        {request &&
          request.map((req, key) => {
            return (
              <div key={key}>
                <h1>
                  {req.user.name.charAt(0).toUpperCase() +
                    req.user.name.slice(1)}
                </h1>
                <h6>Product </h6>
                <h3>{req.name}</h3>
                <h6>Serial Number</h6>
                <p>{req.serialnumber}</p>
                <h6>Description</h6>
                <p>{req.comments}</p>
                <h6>date of Issue :</h6>
                <p>{req.timestamp}</p>
                <h6>date of purchase :</h6>
                <p>{req.dop};</p>
              </div>
            );
          })}
      </div>
    </>
  ) : (
    <h1>hello</h1>
  );
};

export default RequestDetails;
