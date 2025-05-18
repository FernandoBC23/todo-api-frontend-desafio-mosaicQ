const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});


// Criar nova tarefa
router.post('/', async (req, res) => {
  const { titulo, descricao, status } = req.body;

  if (!titulo || !status) {
    return res.status(400).json({ error: 'Título e status são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (titulo, descricao, status) VALUES ($1, $2, $3) RETURNING *',
      [titulo, descricao, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});



module.exports = router;
