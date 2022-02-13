import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import { SocketContext } from "../socket";
import ChatView from "./ChatView";
import ChatWrite from "./ChatWrite";

function ChatBox() {
  return (
    <div>
      <ChatView />
      <ChatWrite />
    </div>
  );
}

export default ChatBox;
