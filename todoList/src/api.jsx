const SERVER_URL = "http://localhost:8080";

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: password })
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

export const registerUser = async ({ email, password }) => {
  const response = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: password })
  });

  if (response.status === 409) throw new Error("Email already exists");
  if (!response.ok) throw new Error("Registration failed");
  return response.json();
};

export const fetchTodos = async (token) => {
  const response = await fetch(`${SERVER_URL}/todo/get`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
};

export const addTodo = async (token, { title, dueDate, category, description }) => {
  const response = await fetch(`${SERVER_URL}/todo/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      dueDate,
      category,
      description,
      completed: false
    })
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return response.json();
};

export const updateTodo = async (token, todo) => {
  const response = await fetch(`${SERVER_URL}/todo/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(todo)
  });
  if (!response.ok) throw new Error("Failed to update todo");
  return response.json();
};

export const deleteTodo = async (token, id) => {
  const response = await fetch(`${SERVER_URL}/todo/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Failed to delete todo");
  return response.json();
};
