import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const API_BASE = "http://localhost:3000";

const ProductoForm = ({ productoEditando, setProductoEditando, loadProductos }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nit, setNit] = useState("");
  const [id, setId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (productoEditando) {
      setId(productoEditando.producto_id);
      setNombre(productoEditando.producto);
      setDescripcion(productoEditando.descripcion);
      setNit(productoEditando.pro_nit); 
    }
  }, [productoEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      prod_nombre: nombre,
      prod_descripcion: descripcion,
      pro_nit: Number(nit),
    };

    const method = id ? "PUT" : "POST";
    const url = id
      ? `${API_BASE}/productos/${id}`
      : `${API_BASE}/productos`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    clearForm();
    loadProductos();
  };

  const clearForm = () => {
    setId(null);
    setNombre("");
    setDescripcion("");
    setNit("");
    setProductoEditando(null);
  };

  return (
    <div className="card p-4 mb-4">
      <h3>{t("producto", { defaultValue: "Producto" })}</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder= {t("nombre", { defaultValue: "Nombre" })}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder={t("descripcion", { defaultValue: "Descripción" })}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder={t("id proveedor", { defaultValue: "Id proveedor" })}
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          required
        />

        <button className="btn btn-success me-2">
          {id ? t("actualizar")  : t("guardar")}
          
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

export default ProductoForm;