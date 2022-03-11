import React from "react";
import { useState } from "react";
import '../pages/canvas/css/DrawPage.css'

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
    <div style={{justifyContent:'center'}}>
      <form onSubmit={handleSubmit} className="joinContainer">
 
          <input style={{marginBottom:'10px',backgroundColor:'#55c959',marginRight:'5px'}} type="text" value={canvasToJoin} onChange={handleChange} />
    
        <input className="inpBtn"  type="submit" value="Join Canvas" />
      </form>
    </div>
  );
}

export default JoinCanvas;
