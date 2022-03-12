import React from "react";
import { socket } from "../helpingComponents/socket";

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
    };

    this.socket = socket;

    socket.on("receive-chat", (sender, text) => {
      console.log("massage received");
      this.state.chatMessages.push(text);
      this.setState({ chatMessages: this.state.chatMessages });
    });
  }

  mapElements = () => {
    let element = (this.state.chatMessages || []).map((v, index) => (
      <div key={index}>{v}</div>
    ));
    return element;
  };

  render() {
    return (
      <div
        style={{
          height: 80,
          background: "white",
          maxHeight: "150px",
          overflow: "auto",
        }}
      >
        {this.mapElements()}
      </div>
    );
  }
}

export default ChatView;
