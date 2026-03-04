import { useTranslation } from "react-i18next";

const Inicio = () => {
  const { t } = useTranslation();
  return (
    <div className="card p-4">
      <h2>{t("bienvenido", { defaultValue: "Bienvenido" })}</h2>
      <p>{t("seleccion", { defaultValue: "Selecciona una opción" })}</p>
    </div>
    
  );
};

export default Inicio;