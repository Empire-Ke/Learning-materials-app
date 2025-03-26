const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Admin login
router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = findUserByUsername(username);
  if (!admin || admin.role !== 'admin' || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin.id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// User login
router.post('/user/login', async (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (!user || user.role !== 'user' || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;