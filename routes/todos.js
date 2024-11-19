const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// POST /todos - Create a new to-do
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const todo = new Todo({
      title,
      description,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'To-Do not found' });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: 'To-Do not found' });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: 'To-Do not found' });
    }

    res.status(200).json({ message: 'To-Do item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
