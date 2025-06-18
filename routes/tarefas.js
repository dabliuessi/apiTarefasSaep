const express = require('express');
const Tarefa = require('../models/tarefa');
const Usuario = require('../models/usuario');
const router = express.Router();

// Criar nova tarefa
router.post('/', async (req, res) => {
  try {
    const { id_usuario, descricao, nome_setor, prioridade } = req.body;
    const tarefa = await Tarefa.create({
      id_usuario,
      descricao,
      nome_setor,
      prioridade
    });
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar tarefas com ordenação
router.get('/', async (req, res) => {
  try {
    const { ordenarPor } = req.query;
    const validFields = ['prioridade', 'status', 'data_cadastro'];
    const order = validFields.includes(ordenarPor) ? [[ordenarPor, 'ASC']] : [];

    const tarefas = await Tarefa.findAll({ order,
      include: [{
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'nome', 'email'] 
      }]
    });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar qualquer campo da tarefa
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacoes = req.body;

    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    await tarefa.update(atualizacoes);
    res.json(tarefa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualizar apenas o status da tarefa
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    tarefa.status = status;
    await tarefa.save();
    res.json(tarefa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar tarefa
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    await tarefa.destroy();
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
