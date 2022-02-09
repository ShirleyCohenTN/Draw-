const io = require("socket.io")(3030, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.9:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-draw", (drawXY) => {
    socket.broadcast.emit("receive-draw", drawXY);
    console.log(socket.id, ": DRAW");
  });

  socket.on("send-start", (drawXY) => {
    socket.broadcast.emit("receive-start", drawXY);
    console.log(socket.id, ": START");
  });

  socket.on("send-end", () => {
    socket.broadcast.emit("receive-end");
    console.log(socket.id, ": END");
  });

  socket.on("send-lineLog", (lineLog) => {
    socket.broadcast.emit("receive-end");
  });
});
