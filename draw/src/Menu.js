import React from "react";
import "./DrawPage.css";
import CanvasID from "./share/CanvasID";
import JoinCanvas from "./share/JoinCanvas";

const Menu = ({
  setLineColor,
  setLineWidth,
  setLineOpacity,
  ID,
  generatePublicCanvasID,
  turnCanvasPrivate,
  joinFriendsCanvas,
  cvs
}) => {


  const clearCanvas = () => {
    var context = cvs.getContext('2d');
    context.clearRect(0, 0, cvs.width, cvs.height);
}



    //work

    const downloadCanvas = () => {
      var canvas = document.getElementById("canvas");
      canvas.fillStyle="blue";
      var url = canvas.toDataURL("image/png");
      var link = document.createElement('a');
      link.download = 'MyCanvasDrawing.png';
      link.href = url;
      link.click();
      
    }



  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
          <button onClick={clearCanvas}>
              Clear Canvas
          </button>
          <button onClick={downloadCanvas}>
              Save Image
          </button>
          <button>
              Invite a Friend
          </button>

          <CanvasID
        generatePublicCanvasID={generatePublicCanvasID}
        turnCanvasPrivate={turnCanvasPrivate}
        ID={ID}
      />
      <JoinCanvas joinFriendsCanvas={joinFriendsCanvas} />
    </div>
  );
    };


export default Menu;
