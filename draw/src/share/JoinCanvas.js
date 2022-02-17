import React from "react";
import { useState } from "react";

function JoinCanvas(props) {
  const [canvasToJoin, setCanvasToJoin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.joinFriendsCanvas(canvasToJoin);
  };

  const handleChange = (e) => {
    setCanvasToJoin(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Join Canvas
          <input type="text" value={canvasToJoin} onChange={handleChange} />
        </label>
        <input type="submit" value="Join" />
      </form>
    </div>
  );
}

export default JoinCanvas;
