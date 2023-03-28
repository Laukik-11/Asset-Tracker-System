import React from "react";
import Navbar from "../components/navbar/Navbar";
import DashBoard from "../components/dashboard/DashBoard";
import Profile from "../components/dashboard/profile";
import { useJwt } from "react-jwt";

const Home = () => {
  const token = window.localStorage.getItem("token");
  return (
    <>
      <DashBoard />
    </>
  );
};

export default Home;
