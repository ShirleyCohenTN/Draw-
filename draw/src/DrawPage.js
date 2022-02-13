import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import Menu from "./Menu";
import "./DrawPage.css";
import { SocketContext } from "./socket";
import ChatWrite from "./chat/ChatWrite";
import ChatBox from "./chat/Chat";

function DrawPage() {
  const socket = useContext(SocketContext);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  //const [lineOpacity, setLineOpacity] = useState(0.1);

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    //ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
    let senders = {};
    //
    //socket logic start
    socket.on("connect", () => {
      console.log(`connectionID: ${socket.id}`);
    });

    socket.on("receive-draw", (drawXY, senderID) => {
      console.log("draw:", drawXY, senderID);
      let drawFrom = senders[senderID];
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(drawFrom.X, drawFrom.Y);
      ctxRef.current.lineTo(drawXY.X, drawXY.Y);
      ctxRef.current.stroke();
      ctxRef.current.closePath();
      console.log(drawXY.X, drawXY.Y);
      senders[senderID] = drawXY;
    });

    socket.on("receive-start", (drawXY, senderID) => {
      console.log("start", drawXY, senderID);
      senders[senderID] = drawXY;

      //ctxRef.current.beginPath();
      //ctxRef.current.moveTo(drawXY.X, drawXY.Y);
      setIsDrawing(true);
    });

    socket.on("receive-end", () => {
      //ctxRef.current.closePath();
      setIsDrawing(false);
      console.log("END");
    });
    //socket logic END
    //
  }, [lineColor, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    // ctxRef.current.beginPath();
    // ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
    let drawXY = { X: e.nativeEvent.offsetX, Y: e.nativeEvent.offsetY };
    socket.emit("send-start", drawXY);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    //ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    let drawXY = { X: e.nativeEvent.offsetX, Y: e.nativeEvent.offsetY };
    socket.emit("send-draw", drawXY);
    ctxRef.current.stroke();
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    socket.emit("send-end");
  };

  return (
    <div className="App">
      <h1>Draw!</h1>
      <div className="draw-area">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          //setLineOpacity={setLineOpacity}
        />
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1280px`}
          height={`620px`}
        />
      </div>
      <ChatBox />
    </div>
  );
}

export default DrawPage;
