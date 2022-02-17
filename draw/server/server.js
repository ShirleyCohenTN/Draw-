const io = require("socket.io")(3030, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.9:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, ": connection");
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
      ")"
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
    io.emit("receive-chat", socket.id, text);
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
