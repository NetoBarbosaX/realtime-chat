const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { env } = require('./config');
const setupChatGateway = require('./modules/chat/chat.gateway');

// Cria servidor HTTP manualmente (caso queira associar com Socket.io)
const server = http.createServer(app);

// Configura Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Inicializa eventos do Chat
setupChatGateway(io);

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
