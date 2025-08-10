import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo as apiAddTodo } from "../api.jsx";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddTodo = () => {
    if (!title.trim()) return alert("Please enter a title");
    apiAddTodo(token, { title, dueDate, category, description })
      .then(() => navigate("/todos"))
      .catch(err => alert(err.message || err));
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
              <h3 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i> Add New Todo
              </h3>
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                {/* Title */}
                <div className="col-12">
                  <label className="form-label fw-semibold">Title</label>
                  <div className="input-group">
                   
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter task title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                {/* Due Date */}
                <div className="col-12 col-sm-6">
                  <label className="form-label fw-semibold">Due Date</label>
                  <div className="input-group">
                
                    <input
                      type="date"
                      className="form-control"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="col-12 col-sm-6">
                  <label className="form-label fw-semibold">Category</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Work, Personal, etc."
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light align-items-start">
                      <i className="bi bi-text-paragraph"></i>
                    </span>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Add more details about the task..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* Buttons */}
                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                  <button
                    className="btn btn-secondary px-4"
                    onClick={() => navigate("/todos")}
                  >
                    <i className="bi bi-x-circle me-1"></i> Cancel
                  </button>
                  <button
                    className="btn btn-primary px-4"
                    onClick={handleAddTodo}
                  >
                    <i className="bi bi-save me-1"></i> Save Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
