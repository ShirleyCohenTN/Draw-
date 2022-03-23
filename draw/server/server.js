const io = require("socket.io")(3030, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

var onlineUsers = [];
var activeCanvases = [];

const reportLog = () => {
  let activeCanvasesForLog = activeCanvases.map((canvas) => {
    return {
      host: canvas.host,
      canvasID: canvas.roomID,
      ctx: "length: " + canvas.ctx.length,
      connected: canvas.connected,
      connectedNames: canvas.connectedNames,
    };
  });
  console.clear();
  console.log(":::::::::::::: LOG ::::::::::::::");
  console.log("onlineUsers[", onlineUsers.length, "]: ", onlineUsers);
  console.log(
    "activeCanvases[",
    activeCanvasesForLog.length,
    "]: ",
    activeCanvasesForLog
  );
};

const addUserToOnlineUsersArray = (socket) => {
  onlineUsers.push(socket.id);
};

//remove disconnected users from onlineUsers
const removeDisconnectedUserFromOnlineUsersArray = (socketID) => {
  var i = onlineUsers.indexOf(socketID);
  onlineUsers.splice(i, 1);
};

//get a canvasID and a dataURL to update the canvas
const saveCurrentCanvas = (canvasID, canvasCurrent) => {
  activeCanvases = activeCanvases.map((canvas) => {
    if (canvas.roomID == canvasID) {
      canvas.ctx = canvasCurrent;
      return canvas;
    } else return canvas;
  });
};

const roomExist = (roomID) => {
  let ans = activeCanvases.find((canvas) => canvas.roomID === roomID);
  //console.log("ans===", ans, "returned: ", ans != undefined);
  return ans != undefined;
};

const getRoomByRoomID = (roomID) => {
  let lost;
  activeCanvases.forEach((canvas) => {
    if (canvas.roomID === roomID) {
      lost = canvas;
    }
  });
  return lost;
};

const updateConnectedToCanvasArray = (socket, canvasToJoin) => {
  activeCanvases.map((canvas) => {
    if (canvas === canvasToJoin) {
      canvas.connected.push(socket.id);
      canvas.connectedNames.push(socket.data.userFullName);
      console.log("connected to: ", canvas.connected);
    }
  });
};

const emitUpdatedConnectedList = (roomID) => {
  let updatedConnectedUsersList = activeCanvases.find(
    (canvas) => canvas.roomID === roomID
  ).connectedNames;
  io.in(roomID).emit(
    "update-list-of-connected-users",
    updatedConnectedUsersList
  );
};

const joinExistingRoom = (socket, roomID) => {
  socket.join(roomID);
  emitUpdatedConnectedList(roomID);
};

const failedJoinRoom = () => {
  console.log("failedJoinRoom");
};

const removeUserFromConnectedArray = (socket) => {
  let inxOfCanvas = -1;
  let inxOfUser = -1;
  activeCanvases.forEach((canvas, index) => {
    inxOfUser = canvas.connected.indexOf(socket.id);
    if (inxOfUser != -1) {
      inxOfCanvas = index;
    }
    console.log("values: ", inxOfUser, " ", inxOfCanvas);
  }, socket);
  if (inxOfCanvas != -1 && inxOfUser != -1) {
    console.log(activeCanvases[inxOfCanvas].connectedNames);
    activeCanvases[inxOfCanvas].connected.splice(inxOfUser, 1);
    activeCanvases[inxOfCanvas].connectedNames.splice(inxOfUser, 1);
    console.log(activeCanvases[inxOfCanvas].connected);
    emitUpdatedConnectedList(activeCanvases[inxOfCanvas].roomID);
    removeInactiveCanvas();
  } else {
  }
};

const removeInactiveCanvas = () => {
  activeCanvases.forEach((canvas, index) => {
    if (canvas.connected.length <= 0) {
      console.log("b: ", activeCanvases.length);
      console.log("removed: room ", canvas.roomID);
      activeCanvases.splice(index, 1);
      console.log("a: ", activeCanvases.length);
    }
  });
};

const addCanvasToActiveCanvasesArray = (socket, roomID, ctx) => {
  activeCanvases.push({
    host: socket.id,
    roomID: roomID,
    ctx: ctx,
    connected: [socket.id],
    connectedNames: [socket.data.userFullName],
  });
  let onlyRoomsArray = activeCanvases.map((activeCanvas) => {
    return activeCanvas.roomID;
  });
  console.log("active Canvases: {", onlyRoomsArray, "}");
};

//////Socket.io Listeners///////

//listening to port connections
io.on("connection", (socket) => {
  addUserToOnlineUsersArray(socket);
  reportLog();

  //listening on port disconnection
  socket.on("disconnect", (reason) => {
    removeDisconnectedUserFromOnlineUsersArray(socket.id);
    removeUserFromConnectedArray(socket);

    reportLog();
    console.log(socket.id, ": disconnection X (", reason, ")");
  });

  //connecting user's name to socket ID
  socket.on("getUserInfo", (userFullName) => {
    socket.data.userFullName = userFullName;
  });

  //return bool for if roomID exists
  socket.on("room-exist", (id, callback) => {
    callback(roomExist(id));
  });

  //user is now drawing
  socket.on("send-draw", (drawXY) => {
    if (drawXY.canvasID)
      io.to(drawXY.canvasID).emit("receive-draw", drawXY, socket.id);
    else io.to(socket.id).emit("receive-draw", drawXY, socket.id);
  });

  //user start drawing a line
  socket.on("send-start", (drawXY) => {
    if (drawXY.canvasID)
      io.to(drawXY.canvasID).emit("receive-start", drawXY, socket.id);
    else io.to(socket.id).emit("receive-start", drawXY, socket.id);
  });

  //user stop drawing a line
  socket.on("send-end", (canvasID, canvasCurrent) => {
    if (canvasID) io.to(canvasID).emit("receive-end");
    else io.to(socket.id).emit("receive-end");

    //update canvas after every line draw
    saveCurrentCanvas(canvasID, canvasCurrent);
  });

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

  //user joined an existing PUBLIC canvas
  socket.on("join-room", (roomID) => {
    let canvasToJoin;
    if (roomExist(roomID)) {
      canvasToJoin = getRoomByRoomID(roomID);
      //console.log("canvasToJoin", canvasToJoin);
      updateConnectedToCanvasArray(socket, canvasToJoin);
      joinExistingRoom(socket, roomID);
      reportLog();
    } else {
      console.log("room not found");
      failedJoinRoom();
    }
  });

  //user turned it's canvas PUBLIC
  socket.on("create-room", (roomID, ctx) => {
    addCanvasToActiveCanvasesArray(socket, roomID, ctx);
    socket.join(roomID);
    reportLog();
  });

  //send previous lines of a canvas
  socket.on("get-canvas-data", (roomID) => {
    if (roomExist(roomID)) {
      let indexOfActiveCanvases = activeCanvases.filter((activeCanvas) => {
        if (activeCanvas.roomID == roomID) {
          return activeCanvas;
        }
      }, roomID);

      io.to(socket.id).emit(
        "receive-canvas-data",
        indexOfActiveCanvases[0].ctx
      );
    }
  });

  socket.on("leave-room", (oldRoom) => {
    socket.leave(oldRoom);
    console.log(
      socket.id,
      " left room: " + (oldRoom == null ? "self" : oldRoom)
    );

    if (oldRoom != null) {
      removeUserFromConnectedArray(socket, oldRoom);
      if (roomExist(oldRoom)) {
        emitUpdatedConnectedList(oldRoom);
      }

      io.to(socket.id).emit("update-list-of-connected-users", []);
    }

    reportLog();
  });

  socket.on("send-clear-canvas", (roomID) => {
    if (roomID) {
      io.in(roomID).emit("clear-canvas");
      console.log("canvas clear for room ", roomID);
    } else io.to(socket.id).emit("clear-canvas");
    console.log("canvas clear for user ", socket.id);
  });
});
