const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = findUserById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};