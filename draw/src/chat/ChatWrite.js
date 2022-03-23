import React from "react";
import { useState, useContext } from "react";
import { SocketContext } from "../helpingComponents/socket";

function ChatWrite({ userInfo }) {
  const socket = useContext(SocketContext);
  const [chatMassage, setChatMassage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-chat", userInfo + ": " + chatMassage);
    setChatMassage("");
  };

  const handleChange = (e) => {
    setChatMassage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          style={{
            width: "100%",
            height: 40,
            border: "none",
            borderTopStyle: "solid",
            borderTopWidth: 2,
            borderTopColor: "gray",
            paddingLeft: "2%"
          }}
          type="text"
          placeholder="Write Something"
          value={chatMassage}
          onChange={handleChange}
        />

        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
}

export default ChatWrite;
