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

module.exports = router;
