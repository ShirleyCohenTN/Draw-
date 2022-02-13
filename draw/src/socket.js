import React from "react";
import { io } from "socket.io-client";

//
//socket.io logic
export const socket = io("http://192.168.1.9:3030");
export const SocketContext = React.createContext();
//socket.io logic end
//
