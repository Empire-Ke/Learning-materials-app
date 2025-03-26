const express = require('express');
const router = express.Router();
const { findMaterials, saveMaterial } = require('../models/Material');
const authMiddleware = require('../middleware/auth');

// Upload material
router.post('/upload', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const { title, description, url } = req.body;
  const material = saveMaterial({ title, description, url, uploadedBy: req.user.id });
  res.status(201).json(material);
});

// View materials
router.get('/', authMiddleware, async (req, res) => {
  const materials = findMaterials();
  res.json(materials);
});

module.exports = router;