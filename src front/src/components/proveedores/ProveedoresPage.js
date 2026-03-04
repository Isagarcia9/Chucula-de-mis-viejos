import React, { useEffect, useState } from "react";
import ProveedorForm from "./ProveedorForm";
import ProveedoresTable from "./ProveedoresTable";
import ProveedoresIA from "./ProveedoresIA";
import { useTranslation } from "react-i18next";

const API_BASE = "http://localhost:3000";

const ProveedoresPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorEditando, setProveedorEditando] = useState(null);
  const { t } = useTranslation();

  const loadProveedores = async () => {
    try {
      const resp = await fetch(`${API_BASE}/proveedores`);
      const data = await resp.json();
      console.log("DATA:", data);  // 👈 mira qué está llegando

      setProveedores(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProveedores();
  }, []);

  const deleteProveedor = async (id) => {
    if (!window.confirm(`¿Eliminar proveedor con ID ${id}?`)) return;

    await fetch(`${API_BASE}/proveedores/${id}`, {
      method: "DELETE",
    });

    loadProveedores();
  };

  return (
    <div>
      <ProveedorForm
        proveedorEditando={proveedorEditando}
        setProveedorEditando={setProveedorEditando}
        loadProveedores={loadProveedores}
      />

      <ProveedoresTable
        proveedores={proveedores}
        onEdit={setProveedorEditando}
        onDelete={deleteProveedor}
      />

      <ProveedoresIA />
    </div>
  );
};

export default ProveedoresPage;