const express = require('express');
const Usuario = require('../models/usuario');
const router = express.Router();

// Criar novo usuário
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar usuários.' });
  }
});
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
