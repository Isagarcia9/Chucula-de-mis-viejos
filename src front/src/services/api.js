const API_BASE = "http://localhost:3000";

export const getProductos = () =>
  fetch(`${API_BASE}/productos`).then(res => res.json());

export const createProducto = (data) =>
  fetch(`${API_BASE}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateProducto = (id, data) =>
  fetch(`${API_BASE}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteProducto = (id) =>
  fetch(`${API_BASE}/productos/${id}`, {
    method: "DELETE",
  });

export const askIA = (question, tipo) =>
  fetch(`${API_BASE}/ia/consulta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, tipo }),
  }).then(res => res.json());