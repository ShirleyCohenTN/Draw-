import React, { useCallback } from "react";
import { useEffect, useRef, useState, useContext } from "react";
import ChatBox from "../../chat/ChatBox";
import { SocketContext } from "../../helpingComponents/socket";
import "./css/DrawPage.css";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";

function DrawPage() {
  const socket = useContext(SocketContext);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [ctxToSave, setCtxToSave] = useState(null);
  const [lineColor, setLineColor] = useState("black");
  const [canvasID, setCanvasID] = useState(null);
  const [backgroundWhite, setBackgroundWhite] = useState(false);
  const [canvasAsString, setCanvasAsString]=useState("empty string")

  //used for working without DB user
  const fakeLocation = {
    state: {
      userID: "00000000",
      fullName: "fakeUser",
    },
  };
  const realLocation = useLocation();
  const location = useLocation().state != null ? realLocation : fakeLocation;

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    console.log("useEffect() IS ON");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    //ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;


    setCanvasAsString(canvas.toDataURL());

    //added white background to the canvas, so when we download the canvas image it will not be transparent
    if (backgroundWhite === false) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setBackgroundWhite(true);
    }

    // ctx.fillStyle = 'white';
    // ctx.fillRect(0,0,canvas.width, canvas.height)

    let senders = {};
    //
    //socket logic start
    socket.on("connect", () => {
      console.log(`connectionID: ${socket.id}`);
      socket.emit(`getUserInfo`, location.state.fullName);
    });

    //socket.on("disconnect", () => {});

    socket.on("receive-draw", (drawXY, senderID) => {
      console.log("draw:", drawXY, senderID);
      let drawFrom = senders[senderID];
      ctxRef.current.strokeStyle = drawFrom.Color;
      ctxRef.current.lineWidth = drawFrom.Width;
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(drawFrom.X, drawFrom.Y);
      ctxRef.current.lineTo(drawXY.X, drawXY.Y);
      ctxRef.current.stroke();
      ctxRef.current.closePath();
      //setLineColor(prevVal);
      console.log(drawXY.X, drawXY.Y);
      senders[senderID] = drawXY;
    });

    socket.on("receive-start", (drawXY, senderID) => {
      console.log("start", drawXY, senderID);
      senders[senderID] = drawXY;

      setIsDrawing(true);
    });

    socket.on("receive-end", () => {
      setIsDrawing(false);
      console.log("END");
    });

    socket.on("receive-canvas-data", (ctx) => {
      console.log("receive-canvas-data: RECEIVED CTX:", ctx);
      var img = new Image();
      img.onload = () => {
        ctxRef.current.drawImage(img, 0, 0);
      };
      img.src = ctx;
      // img.src =
      //   "https://filmfare.wwmindia.com/content/2021/nov/rrr11638189129.jpg";
      setCtxToSave(ctx);
    });
    //socket logic END
    //
  }, [
    lineColor,
    lineWidth,
    //backgroundWhite,
    socket,
    location.state.fullName,
    canvasAsString
    //ctxToSave,
  ]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    setIsDrawing(true);
    let drawXY = {
      X: e.nativeEvent.offsetX,
      Y: e.nativeEvent.offsetY,
      Color: lineColor,
      Width: lineWidth,
      canvasID: canvasID,
    };

    socket.emit("send-start", drawXY);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    let drawXY = {
      X: e.nativeEvent.offsetX,
      Y: e.nativeEvent.offsetY,
      Color: lineColor,
      Width: lineWidth,
      canvasID: canvasID,
    };
    socket.emit("send-draw", drawXY);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    let canvasURL = canvasRef.current.toDataURL();
    socket.emit("send-end", canvasID, canvasURL);
  };

  const generatePublicCanvasID = () => {
    let cID = "" + socket.id;
    cID = cID.slice(cID.length - 4) + Math.floor(Math.random() * 100);
    socket.emit("leave-room", canvasID);
    setCanvasID(cID);
    let canvasURL = canvasRef.current.toDataURL();
    socket.emit("create-room", cID, canvasURL);
  };

  const turnCanvasPrivate = () => {
    socket.emit("leave-room", canvasID);
    setCanvasID(null);
    socket.emit("join-room", socket.id);
  };

  const joinFriendsCanvas = (ID) => {
    socket.emit("leave-room", canvasID);
    setCanvasID(ID);
    socket.emit("join-room", ID);
    socket.emit("get-canvas-data", ID);
  };

  return (
    <div className="App">
      <h1>Draw!</h1>
      <h2>
        Hello User ID: {location.state.userID} , Name: {location.state.fullName}
      </h2>
      <div className="draw-area">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          //setLineOpacity={setLineOpacity}

          //sending the object to be able to clear the canvas
          cvs={canvasRef.current}
          ID={canvasID}
          generatePublicCanvasID={generatePublicCanvasID}
          turnCanvasPrivate={turnCanvasPrivate}
          joinFriendsCanvas={joinFriendsCanvas}

          UserID = {location.state.userID}
          canvasAsString={canvasAsString}
        />
        <canvas
          id="canvas"
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1200px`}
          height={`620px`}
        />
      </div>
      <ChatBox userInfo={location.state.fullName} />
    </div>
  );
}

export default DrawPage;
