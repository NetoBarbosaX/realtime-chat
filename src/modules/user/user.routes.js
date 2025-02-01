const express = require('express');
const userService = require('./user.service');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await userService.createUser({ username });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot create user' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot fetch user' });
  }
});

module.exports = router;
