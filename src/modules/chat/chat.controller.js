const chatService = require('./chat.service');

async function postMessage(req, res) {
  try {
    const { userId, content, roomId } = req.body;
    const newMessage = await chatService.saveMessage({ userId, content, roomId });
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ error: 'Error saving message' });
  }

}

async function getUserMessages(req, res) {
  try {
    const { userId } = req.params;
    const messages = await chatService.getMessagesByUser(userId);
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching messages' });
  }
}

module.exports = {
  postMessage,
  getUserMessages,
};
