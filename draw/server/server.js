const io = require("socket.io")(3030, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.9:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-draw", (drawXY) => {
    io.emit("receive-draw", drawXY, socket.id);
    console.log(socket.id, ": DRAW");
  });

  socket.on("send-start", (drawXY) => {
    io.emit("receive-start", drawXY, socket.id);
    console.log(socket.id, ": START");
  });

  socket.on("send-end", () => {
    io.emit("receive-end");
    console.log(socket.id, ": END");
  });

  //
  // socket.on("send-lineLog", (lineLog) => {
  //   socket.broadcast.emit("receive-end");
  // });

  socket.on("send-chat", (text) => {
    //console.log(text);
    io.emit("receive-chat", socket.id, text);
  });
});
