import React, { useState } from "react";
import Inicio from "./Inicio";
import ProductosPage from "../productos/ProductosPage";
import ProveedoresPage from "../proveedores/ProveedoresPage";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [tab, setTab] = useState("inicio");
  const { t } = useTranslation();

  return (
    <div className="container mt-4">
      <div className="btn-group mb-4">
        <button onClick={() => setTab("inicio")} className="btn btn-primary">
          {t("inicio", { defaultValue: "Inicio" })}
        </button>
        <button onClick={() => setTab("productos")} className="btn btn-primary">
          {t("productos", { defaultValue: "Productos" })}
        </button>
        <button onClick={() => setTab("proveedores")} className="btn btn-primary">
          {t("proveedores", { defaultValue: "Proveedores" })}
        </button>
      </div>

      {tab === "inicio" && <Inicio />}
      {tab === "productos" && <ProductosPage />}
      {tab === "proveedores" && <ProveedoresPage />}
    </div>
  );
};

export default Dashboard;