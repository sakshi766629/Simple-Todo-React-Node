import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];
let nextId = 1;

app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
  const text = req.body.text?.trim();
  if (!text) return res.status(400).json({ error: "Enter a task" });
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Task not found" });
  todo.done = !todo.done;
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id !== Number(req.params.id));
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
