import SocketIOClient from "socket.io-client";

const socketConnect = SocketIOClient("https://nodejs-mobilestore.vercel.app").connect();

export default socketConnect;
