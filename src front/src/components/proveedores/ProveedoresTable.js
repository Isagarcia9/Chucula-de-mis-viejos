import React from "react";
import { useTranslation } from "react-i18next";
const ProveedoresTable = ({ proveedores, onEdit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div className="card p-4 mb-4">
      <h3>{t("listaproveedores")}</h3>

      <table className="table">
        <thead>
          <tr>
            <th>NIT</th>
            <th>{t("proveedor")}</th>
            <th>{t("telefono")}</th>
            <th>{t("acciones")}</th>
          </tr>
        </thead>

        <tbody>
          {proveedores.length === 0 ? (
            <tr>
              <td colSpan="4">{t("noProveedores")}</td>
            </tr>
          ) : (
            proveedores.map((p) => (
              <tr key={p.proveedor_id}>
                <td>{p.proveedor_id}</td>
                <td>{p.proveedor}</td>
                <td>{p.telefono_proveedor}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(p)}
                  >
                    {t("editar", { defaultValue: "Editar" })}
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(p.proveedor_id)}
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

export default ProveedoresTable;