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



// Atualizar uma tarefa existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status } = req.body;

  if (!titulo || !status) {
    return res.status(400).json({ error: 'Título e status são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'UPDATE tasks SET titulo = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *',
      [titulo, descricao, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});



// Deletar uma tarefa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json({ message: 'Tarefa removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tarefa' });
  }
});


module.exports = router;
