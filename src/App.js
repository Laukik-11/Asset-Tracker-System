import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Layout/Home.js";
import Login from "./components/Login/Login";
import Request from "./components/dashboard/Request";
import Signup from "./components/Login/Signup";
import Navbar from "./components/navbar/Navbar";
import Tickets from "./components/dashboard/Tickets";
import RequestDetails from "./components/dashboard/RequestDetails";
import Ticketform from "./components/dashboard/Ticketform";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ticket" element={<Tickets />} />
          <Route path="/newticket" element={<Ticketform />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/request" element={<Request />} />
          <Route path="/home/:id" element={<RequestDetails />} />
          {/* <Route path="/home" element={<EditorLogin />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
