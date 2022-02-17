import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DrawPage from "./DrawPage";
import Login from "./Login";
import SignUp from "./SignUp";
import { SocketContext, socket } from "./socket";

function App() {
  return (
    // <div>
    //     <HomePage/>
    // </div>
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path="/" element={<DrawPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
