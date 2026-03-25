
const Todo = require("../models/Todo");

// GET all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// ADD todo
exports.createTodo = async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });

  const saved = await newTodo.save();
  res.json(saved);
};

// DELETE todo
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};