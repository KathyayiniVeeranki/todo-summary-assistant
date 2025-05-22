const express = require('express');
const router = express.Router();
const { getTodos, addTodo, deleteTodo } = require('../services/db');

router.get('/', async (req, res) => {
  const todos = await getTodos();
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  const todo = await addTodo(text);
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await deleteTodo(id);
  res.sendStatus(204);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const { updateTodo } = require('../services/db');
    const updated = await updateTodo(id, text);
    res.json(updated);
  } catch (err) {
    console.error("Update failed:", err.message);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

module.exports = router;
