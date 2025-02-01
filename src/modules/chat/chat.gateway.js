const chatService = require('./chat.service');
const roomService = require('../room/room.service');

function setupChatGateway(io) {
    io.on('connection', (socket) => {
        console.log('Novo cliente conectado:', socket.id);

        socket.on('joinRoom', async (roomId) => {
            const room = await roomService.findRoomById(roomId);
            if (!room) {
                console.log(`Sala não encontrada no banco: ${roomId}`);
                socket.emit('roomNotFound', { error: 'Room does not exist' });
                return;
            }
            socket.join(roomId);
            console.log(`Socket ${socket.id} entrou na sala ${roomId}`);
        });

        socket.on('message', async (data) => {
            try {

                const savedMessage = await chatService.saveMessage(data);
                io.to(data.roomId).emit('newMessage', savedMessage);
            } catch (error) {
                console.error('Erro ao salvar mensagem:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
}

module.exports = setupChatGateway;
