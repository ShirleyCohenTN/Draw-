import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { socket, SocketContext } from "./helpingComponents/socket";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import DrawPage from "./pages/canvas/DrawPage";


function App() {
  return (
    // <div>
    //     <HomePage/>
    // </div>
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/drawing" element={<DrawPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
