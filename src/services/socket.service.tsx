import SocketIOClient from "socket.io-client";

const socketConnect = SocketIOClient("https://nodejs-mobilestore.vercel.app", { transports: ["websocket"] }).connect();

export default socketConnect;
