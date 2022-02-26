import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import { SocketContext } from "../helpingComponents/socket";

function ChatWrite() {
  const socket = useContext(SocketContext);
  const [chatMassage, setChatMassage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-chat", chatMassage);
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
