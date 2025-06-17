const express = require('express');
const Usuario = require('../models/usuario');
const router = express.Router();

// Criar novo usuário
router.post('/', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const usuario = await Usuario.create({ nome, email });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
