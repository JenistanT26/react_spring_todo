import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTodos, updateTodo as apiUpdateTodo, deleteTodo as apiDeleteTodo } from "../api.jsx";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    reloadTodos();
  }, [token, navigate]);

  const reloadTodos = () => {
    fetchTodos(token)
      .then(setTodos)
      .catch(err => alert(err.message || err));
  };

  const handleToggle = (todo) => {
    apiUpdateTodo(token, { ...todo, completed: !todo.completed })
      .then(reloadTodos)
      .catch(err => alert(err.message || err));
  };

  const handleDelete = (id) => {
    apiDeleteTodo(token, id)
      .then(reloadTodos)
      .catch(err => alert(err.message || err));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Your Todos</h2>
        <button className="btn btn-success" onClick={() => navigate("/add-todo")}>
          + Add Todo
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-muted fst-italic">No todos found. Please add some!</p>
      ) : (
        <div className="row g-3">
          {todos.map(todo => (
            <div key={todo.id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body d-flex flex-column">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo)}
                    />
                    <label
                      className={`form-check-label fw-bold ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
                    >
                      {todo.title}
                    </label>
                  </div>
                  <small className="text-secondary mb-2">
                    Due: {todo.dueDate ? todo.dueDate.split("T")[0] : "—"} | Category: {todo.category || "—"}
                  </small>
                  {todo.description && <p className="flex-grow-1">{todo.description}</p>}
                  <button className="btn btn-danger btn-sm mt-auto" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
