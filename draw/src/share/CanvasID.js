import React from "react";

function CanvasID(props) {
  if (props.ID == null) {
    return (
      <div>
        <label onClick={props.generatePublicCanvasID}>Status: Private</label>
      </div>
    );
  }

  return (
    <div>
      <label onClick={props.turnCanvasPrivate}>Status: Public </label>
      <label>Canvas ID: {props.ID}</label>
    </div>
  );
}

export default CanvasID;
