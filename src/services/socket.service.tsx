import SocketIOClient from "socket.io-client";

const socketConnect = SocketIOClient("https://nodejs-mobilestore.vercel.app", { secure: true }).connect();

export default socketConnect;
