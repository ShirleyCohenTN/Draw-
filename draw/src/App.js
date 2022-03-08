import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { socket, SocketContext } from "./helpingComponents/socket";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import DrawPage from "./pages/canvas/DrawPage";
import MyCanvases from "./pages/myCanvases/MyCanvases";
import EditMyCanvas from "./pages/myCanvases/EditMyCanvas";
import { Container } from "../../draw/src/pages/authentication/Container";
import '../src/App.css'


function App() {
  return (
    // <div>
    //     <HomePage/>
    // </div>
    <div className="App cfb">
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/drawing" element={<DrawPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mycanvases" element={<MyCanvases />} />
          <Route path="/editcanvases" element={<EditMyCanvas />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
    </div>
  );
}

export default App;
