import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const API_BASE = "http://localhost:3000";

const ProveedorForm = ({
  proveedorEditando,
  setProveedorEditando,
  loadProveedores,
}) => {
  const [nit, setNit] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (proveedorEditando) {
      setNit(proveedorEditando.proveedor_id);
      setNombre(proveedorEditando.proveedor);
      setTelefono(proveedorEditando.telefono_proveedor);
      setIsEditing(true);
    }
  }, [proveedorEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      pro_nombre: nombre,
      pro_telefono: telefono,
    };

    if (!isEditing) {
      body.pro_nit = nit;
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${API_BASE}/proveedores/${nit}`
      : `${API_BASE}/proveedores`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    clearForm();
    loadProveedores();
  };

  const clearForm = () => {
    setNit("");
    setNombre("");
    setTelefono("");
    setIsEditing(false);
    setProveedorEditando(null);
  };

  return (
    <div className="card p-4 mb-4">
      <h3>{t("proveedor")}</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder={t("nitProveedor")}
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          required
          readOnly={isEditing}
        />

        <input
          className="form-control mb-2"
          placeholder={t("nombreProveedor")}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder={t("telefono")}
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />

        <button className="btn btn-success me-2">
          {isEditing ? t("actualizar")  : t("guardar")}
          
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={clearForm}
        >
          {t("limpiar", { defaultValue: "Limpiar" })}
        </button>
      </form>
    </div>
  );
};

export default ProveedorForm;