import React from "react";
import { useTranslation } from "react-i18next";

const ProductosTable = ({ productos, onEdit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div className="card p-4 mb-4">
      <h3>{t("lista", { defaultValue: "Lista" })}</h3>

      <table className="table">
        <thead>
          <tr>
            <th>{t("id", { defaultValue: "ID" })}</th>
            <th>{t("producto", { defaultValue: "Producto" })}</th>
            <th>{t("descripcion", { defaultValue: "Descripcion" })}</th>
            <th>{t("proveedor", { defaultValue: "Proveedor" })}</th>
            <th>{t("acciones", { defaultValue: "Acciones" })}</th>
          </tr>
        </thead>

        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="5">{t("noProducto", { defaultValue: "No hay productos" })}</td>
            </tr>
          ) : (
            productos.map((p) => (
              <tr key={p.producto_id}>
                <td>{p.producto_id}</td>
                <td>{p.producto}</td>
                <td>{p.descripcion}</td>
                <td>{p.proveedor}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(p)}
                  >
                    {t("editar", { defaultValue: "Editar" })}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(p.producto_id)}
                  >
                    {t("eliminarU", { defaultValue: "Eliminar" })}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosTable;