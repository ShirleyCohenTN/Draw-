const io = require("socket.io")(3030, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

var onlineUsers = [];
var activeCanvases = [];

//listening to port connections
io.on("connection", (socket) => {
  onlineUsers.push(socket.id);
  console.log("users: ", onlineUsers);
  console.log(socket.id, ": connection O");

  //listening on port disconnection
  socket.on("disconnect", (reason) => {
    console.log(socket.id, ": disconnection X (", reason, ")");
    //remove disconnected users from onlineUsers
    var i = onlineUsers.indexOf(socket.id);
    onlineUsers.splice(i, 1);
  });
  /////////////////////////////////

  //connecting user's name to socket ID
  socket.on("getUserInfo", (userFullName) => {
    socket.data.userFullName = userFullName;
    console.log(
      "id: ",
      socket.id,
      " name connected:",
      socket.data.userFullName
    );
  });
  //////////////////////////////////////

  //user is now drawing
  socket.on("send-draw", (drawXY) => {
    if (drawXY.canvasID)
      io.to(drawXY.canvasID).emit("receive-draw", drawXY, socket.id);
    else io.to(socket.id).emit("receive-draw", drawXY, socket.id);
    // console.log(
    //   socket.id,
    //   ": DRAW (brush: {",
    //   drawXY.Color,
    //   ", ",
    //   drawXY.Width,
    //   "}) ",
    //   "(to CanvasID: ",
    //   drawXY.canvasID,
    //   ")",
    //   socket.rooms
    // );
  });
  ///////////////////////

  //user start drawing a line
  socket.on("send-start", (drawXY) => {
    if (drawXY.canvasID)
      io.to(drawXY.canvasID).emit("receive-start", drawXY, socket.id);
    else io.to(socket.id).emit("receive-start", drawXY, socket.id);
    //console.log(socket.id, ": START");
  });
  ///////////////////////////

  //user stop drawing a line
  socket.on("send-end", (canvasID, canvasCurrent) => {
    if (canvasID) io.to(canvasID).emit("receive-end");
    else io.to(socket.id).emit("receive-end");
    console.log(socket.id, ": END ", canvasID);

    activeCanvases.map((canvas) => {
      console.log(
        "SEND-END: ",
        canvas.roomID,
        "==",
        canvasID,
        canvas.roomID == canvasID
      );
      if (canvas.roomID == canvasID) {
        console.log();
        canvas.ctx = canvasCurrent;
      }
    });
  });
  ///////////////////////////

  //chat sent
  socket.on("send-chat", (text) => {
    if (socket.rooms.size > 1) {
      socket.rooms.forEach((canvasChat) => {
        console.log(
          "chat from {",
          socket.id,
          "(",
          socket.data.userFullName,
          ")} to {",
          canvasChat,
          "}"
        );
        if (socket.id != canvasChat) {
          io.in(canvasChat).emit(
            "receive-chat",
            socket.data.userFullName,
            text
          );
        }
      });
    } else {
      io.to(socket.id).emit("receive-chat", socket.data.userFullName, text);
    }
  });
  //////////

  //user joined an existing PUBLIC canvas
  socket.on("join-room", (roomID, ctx) => {
    try {
      let canvasToJoin = activeCanvases.find(
        (canvas) => canvas.roomID === roomID
      );
      console.log("canvasToJoin: ", canvasToJoin.roomID);
      activeCanvases.map((canvas) => {
        if (canvas === canvasToJoin) {
          canvas.connected.push(socket.id);
        }
      });

      //adding the friend to the canvas
      socket.join(roomID);
      console.log(
        socket.id,
        " joined room: " + (roomID == "null" ? "self" : roomID)
      );
      ////////////////////////////////
    } catch (error) {
      console.log("failed", error);
    }
  });
  ////////////////////////////////////////

  //user turned it's canvas PUBLIC
  socket.on("create-room", (roomID, ctx) => {
    try {
      //when public canvas is created, it is added to the list of active canvases
      activeCanvases.push({
        host: socket.id,
        roomID: roomID,
        ctx: ctx,
        connected: [socket.id],
      });
      let onlyRoomsArray = activeCanvases.map((activeCanvas) => {
        return activeCanvas.roomID;
      });
      console.log("active Canvases: {", onlyRoomsArray, "}");
      ////////////////////////////////////////////////////////////////////////////

      //adding the creator to the canvas
      socket.join(roomID);
      console.log(
        socket.id,
        " Created room: " + (roomID == "null" ? "self" : roomID)
      );
      ///////////////////////////////////
    } catch (error) {
      console.log("failed: ", error);
    }
  });

  socket.on("get-canvas-data", (roomID) => {
    let indexOfActiveCanvases = activeCanvases.map((activeCanvas, index) => {
      if (activeCanvas.roomID == roomID) {
        console.log(
          "get-canvas-data: ",
          "room:",
          roomID,
          " == ",
          activeCanvas.roomID,
          roomID == activeCanvas.roomID
        );
        return activeCanvas;
      }
    }, roomID);

    // var indexOfActiveCanvases = activeCanvases
    //   .map((e) => {
    //     console.log("room:", roomID, " = ", e.roomID, "????");
    //     return e.roomID;
    //   }, roomID)
    //   .indexOf(roomID);

    if (indexOfActiveCanvases.length <= 0) {
      console.log(" NOT FOUND: ", indexOfActiveCanvases);
    } else {
      console.log(
        "receive-canvas-data: FOUND ON ",
        indexOfActiveCanvases,
        " - "
        //activeCanvases[indexOfActiveCanvases].roomID
      );
      // console.log(
      //   "receive-canvas-data: SENDING CTX ",
      //   indexOfActiveCanvases[0].ctx
      // );
      io.to(socket.id).emit(
        "receive-canvas-data",
        indexOfActiveCanvases[0].ctx
      );
    }
  });

  socket.on("leave-room", (roomID) => {
    socket.leave(roomID);
    console.log(socket.id, " left room: " + (roomID == null ? "self" : roomID));
  });
});
