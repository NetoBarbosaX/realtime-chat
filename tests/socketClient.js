const { io } = require("socket.io-client");

// Substitua pelo ID real da sua room e user
const ROOM_ID = "2";  
const USER_ID = "aef2bc50-9e0a-4c44-99f3-c286d5adf608"; 

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Conectado ao servidor Socket.io! ID:", socket.id);

  // Entra na sala (precisa existir no BD, senão "roomNotFound")
  socket.emit("joinRoom", ROOM_ID);

  // Emite uma mensagem
  socket.emit("message", {
    roomId: ROOM_ID,
    userId: USER_ID,
    content: "Olá via Socket.io-client!"
  });
});

// Recebe evento de nova mensagem
socket.on("newMessage", (msg) => {
  console.log("Nova mensagem recebida:", msg);
});

socket.on("roomNotFound", (data) => {
  console.error("Erro de sala:", data);
});

socket.on("disconnect", () => {
  console.log("Desconectado do servidor");
});
