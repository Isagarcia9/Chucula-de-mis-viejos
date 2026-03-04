import React, { useEffect, useState } from "react";
import ProductoForm from "./ProductoForm";
import ProductosTable from "./ProductosTable";
import ProductosIA from "./ProductosIA";
import { useTranslation } from "react-i18next";

const API_BASE = "http://localhost:3000";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const { t } = useTranslation();

  const loadProductos = async () => {
    try {
      const resp = await fetch(`${API_BASE}/productos`);
      const data = await resp.json();

      
      setProductos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const deleteProducto = async (id) => {
    if (!window.confirm(t("eliminar"))) return;

    await fetch(`${API_BASE}/productos/${id}`, {
      method: "DELETE",
    });

    loadProductos();
  };

  return (
    <div>
      <ProductoForm
        productoEditando={productoEditando}
        setProductoEditando={setProductoEditando}
        loadProductos={loadProductos}
      />

      <ProductosTable
        productos={productos}
        onEdit={setProductoEditando}
        onDelete={deleteProducto}
      />

      <ProductosIA />
    </div>
  );
};

export default ProductosPage;