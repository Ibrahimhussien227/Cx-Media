import { io, Socket } from "socket.io-client";
const SOCKET_IO_URL = "http://localhost:4006";
let socket: Socket;

const connectSocket = async () => {
  //get token value from local storage
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDUxNTk1MzcsImlkIjoiZGE5MTg0OTUtOGFiNC00OTJjLWIzMmQtOTEwYzYxNGExYzAxIiwidXNlcklkIjoiZGE5MTg0OTUtOGFiNC00OTJjLWIzMmQtOTEwYzYxNGExYzAxIiwibW9iaWxlTnVtYmVyIjoiNjY2NjY2NjY2NTUiLCJlbWFpbCI6ImJhYmx1QGJsb2NrZ2VtaW5pLmNvbSIsImNvdW50cnlDb2RlIjoiKzk3MSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsInBhcnRuZXJJZCI6bnVsbCwic291cmNlIjoiV0VCX1BPUlRBTCIsImlhdCI6MTcwMjUzMTUzN30.sIafNTdk2PsaKjPQcAd_rPaDGKPlH4gflS3BhGd_b54";
  socket = io(SOCKET_IO_URL, {
    path: "/ioSocket",
    extraHeaders: {
      "x-access-token": token,
    },
  });
  // Add a connect listener
  socket.on("connect", () => {
    console.log("Connected!");
  });
};

const getSocketConnection = () => {
  if (!socket) {
    connectSocket();
  }
  return socket;
};

export { connectSocket, getSocketConnection };
