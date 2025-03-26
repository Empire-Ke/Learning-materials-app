const express = require('express');
const router = express.Router();
const { findUserById, updateUser } = require('../models/User');
const authMiddleware = require('../middleware/auth');

// View user profile
router.get('/profile', authMiddleware, async (req, res) => {
  res.json(req.user);
});

// Update user points and badges
router.post('/gamify', authMiddleware, async (req, res) => {
  const { points, badges } = req.body;
  req.user.points += points;
  req.user.badges.push(...badges);
  const updatedUser = updateUser(req.user);
  res.json(updatedUser);
});

module.exports = router;