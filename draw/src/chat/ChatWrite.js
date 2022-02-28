import React from "react";
import {useState, useContext } from "react";
import { SocketContext } from "../helpingComponents/socket";

function ChatWrite({userInfo}) {
  const socket = useContext(SocketContext);
  const [chatMassage, setChatMassage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-chat", userInfo+': '+chatMassage);
  };

  const handleChange = (e) => {
    setChatMassage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          massage:
          <input type="text" value={chatMassage} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ChatWrite;
