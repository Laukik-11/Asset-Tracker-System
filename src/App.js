import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Layout/Home.js";
import Login from "./components/Login/Login";
import Request from "./components/dashboard/Request";
import Signup from "./components/Login/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<Request />} />
        {/* <Route path="/home" element={<EditorLogin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
