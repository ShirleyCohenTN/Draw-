import React from "react";
import ChatView from "./ChatView";
import ChatWrite from "./ChatWrite";

function ChatBox({userInfo}) {

  return (
    <div>
      <ChatView />
      <ChatWrite userInfo={userInfo}/>
    </div>
  );
}

export default ChatBox;
