import React from "react";

function CanvasID(props) {
  if (props.ID == null) {
    return (
      <div>
        <label style={{cursor:"pointer",fontSize:'16px'}} onClick={props.generatePublicCanvasID}>Status: Private</label>
      </div>
    );
  }

  return (
    <div>
      <label style={{cursor:"pointer",fontSize:'16px'}} onClick={props.turnCanvasPrivate}>Status: Public </label>
      <label style={{backgroundColor:"rgb(255, 255, 204)"
}}>Canvas ID: {props.ID}</label>
    </div>
  );
}

export default CanvasID;
