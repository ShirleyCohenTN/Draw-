import React from "react";
import Icon from "@mdi/react";
import { mdiPalette } from "@mdi/js";

//spin
function ConnectedUserIcon({ nameOfUser }) {
  const randomColor = () => {
    return Math.floor(Math.random() * 255) + 0;
  };

  return (
    <div style={{ margin: 20, backgroundColor: "pink" }}>
      <Icon
        style={{ justifyContent: "center" }}
        path={mdiPalette}
        size={2}
        color="#fff"
        spin
      />
      <h2>{nameOfUser}</h2>
    </div>
  );
}

export default ConnectedUserIcon;
