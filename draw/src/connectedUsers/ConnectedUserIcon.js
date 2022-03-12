import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiPalette, mdiAccountTie } from "@mdi/js";

function ConnectedUserIcon({ nameOfUser }) {
  const [randomColor, setRandomColor] = useState(null);

  useEffect(() => {
    setRandomColor("#" + Math.floor(Math.random() * 16777215).toString(16));
  }, []);

  return (
    <div
      style={{
        margin: 20,
        padding: 15,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: 20,
      }}
    >
      <Icon
        style={{
          marginLeft: "18%",
          borderWidth: 5,
          borderColor: "black",
          //borderStyle: "solid",
          borderRadius: 50,
        }}
        path={mdiAccountTie}
        size={2}
        color={randomColor}
      />
      <h3 style={{ textAlign: "center" }}>{nameOfUser}</h3>
    </div>
  );
}

export default ConnectedUserIcon;
