import React from "react";
import { io } from "socket.io-client";

//
//socket.io logic
export const socket = io("http://192.168.1.9:3030");
export const SocketContext = React.createContext();
const socketPack = () => {
  socket.on("connect", () => {
    console.log(`connection ${socket.id}`);
  });

  socket.on("receive-draw", (drawXY) => {
    console.log(drawXY.X, drawXY.Y);
  });

  socket.on("receive-start", (drawXY) => {
    console.log("start at: ", drawXY.X, drawXY.Y);
  });

  socket.on("receive-end", () => {
    console.log("END");
  });
};
//socket.io logic end
//
