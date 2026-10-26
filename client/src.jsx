import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  async function loadTodos() {
    const res = await fetch("http://localhost:5000/todos");
    setTodos(await res.json());
  }

  useEffect(() => { loadTodos(); }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    setText("");
    loadTodos();
  }

  async function toggleTodo(id) {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "PATCH" });
    loadTodos();
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    loadTodos();
  }

  return (
    <main className="box">
      <h1>My Todo List</h1>
      <form onSubmit={addTodo}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter a task" />
        <button>Add</button>
      </form>
      {todos.length === 0 && <p>No tasks yet. Add your first task!</p>}
      {todos.map(todo => (
        <div className="todo" key={todo.id}>
          <span onClick={() => toggleTodo(todo.id)} className={todo.done ? "done" : ""}>
            {todo.done ? "☑" : "☐"} {todo.text}
          </span>
          <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
