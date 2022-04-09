import SocketIOClient from "socket.io-client";

const socketConnect = SocketIOClient("https://chuong-mobilestore.vercel.app").connect();

export default socketConnect;
