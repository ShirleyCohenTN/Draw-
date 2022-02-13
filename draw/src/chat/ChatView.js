import { render } from "@testing-library/react";
import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import { socket, SocketContext } from "../socket";

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
    };

    this.socket = socket;

    socket.on("receive-chat", (sender, text) => {
      console.log("massage received");
      this.state.chatMessages.push(sender + ": " + text);
      this.setState({ chatMessages: this.state.chatMessages });
    });
  }

  mapElements = () => {
    let element = (this.state.chatMessages || []).map((v) => <div>{v}</div>);
    return element;
  };

  render() {
    return (
      <div style={{ height: 100, background: "white" }}>
        {this.mapElements()}
      </div>
    );
  }
}

export default ChatView;
