const io = require("socket.io")(3030, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

var onlineUsers = [];

//listening to port connections
io.on("connection", (socket) => {
  onlineUsers.push(socket.id);
  console.log("users: ", onlineUsers);

  //
  socket.on("disconnect", (reason) => {
    console.log(socket.id, ": disconnection X (", reason, ")");

    var i = onlineUsers.indexOf(socket.id);
    onlineUsers.splice(i, 1);
  });

  console.log(socket.id, ": connection O");
  socket.on("send-draw", (drawXY) => {
    if (drawXY.canvasID)
      io.to(drawXY.canvasID).emit("receive-draw", drawXY, socket.id);
    else io.to(socket.id).emit("receive-draw", drawXY, socket.id);
    console.log(
      socket.id,
      ": DRAW (brush: {",
      drawXY.Color,
      ", ",
      drawXY.Width,
      "}) ",
      "(to CanvasID: ",
      drawXY.canvasID,
      ")",
      socket.rooms
    );
  });

  socket.on("send-start", (drawXY) => {
    io.emit("receive-start", drawXY, socket.id);
    console.log(socket.id, ": START");
  });

  socket.on("send-end", () => {
    io.emit("receive-end");
    console.log(socket.id, ": END ");
  });

  //
  // socket.on("send-lineLog", (lineLog) => {
  //   socket.broadcast.emit("receive-end");
  // });

  socket.on("send-chat", (text) => {
    if (socket.rooms.size > 1) {
      socket.rooms.forEach((canvasChat) => {
        console.log("chat from {", socket.id, "} to {", canvasChat, "}");

        if (socket.id != canvasChat) {
          io.in(canvasChat).emit("receive-chat", socket.id, text);
        }
      });
    } else {
      io.to(socket.id).emit("receive-chat", socket.id, text);
    }
  });

  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    console.log(
      socket.id,
      " joined room: " + (roomID == "null" ? "self" : roomID)
    );
  });

  socket.on("leave-room", (roomID) => {
    socket.leave(roomID);
    console.log(
      socket.id,
      " left room: " + (roomID == "null" ? "self" : roomID)
    );
  });
});
