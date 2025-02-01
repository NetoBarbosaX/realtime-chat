const userService = require('./user.service');

async function createUser(req, res) {
  try {
    const { username } = req.body;
    const user = await userService.createUser({ username });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot create user' });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Cannot fetch user' });
  }
}

module.exports = {
  createUser,
  getUserById,
};
