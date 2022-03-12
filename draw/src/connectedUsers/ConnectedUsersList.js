import React from "react";
import ConnectedUserIcon from "./ConnectedUserIcon";

function ConnectedUserList({ list }) {
  const mapElements = () => {
    let element = (list || []).map((connectedUser, index) => (
      <ConnectedUserIcon key={index} nameOfUser={connectedUser} />
    ));
    return element;
  };

  if (list.length < 1) {
    return (
      <div>
        {/* <h2>no one connected</h2> */}
        <ConnectedUserIcon key={0} nameOfUser={"YOU"} />
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <h2>connected:</h2>
      {mapElements()}
    </div>
  );
}

export default ConnectedUserList;
