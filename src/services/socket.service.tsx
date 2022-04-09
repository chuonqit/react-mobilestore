import SocketIOClient from "socket.io-client";

const socketConnect = SocketIOClient("http://localhost:5000").connect();

export default socketConnect;
