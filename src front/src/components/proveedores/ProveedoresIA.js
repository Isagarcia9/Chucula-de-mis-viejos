import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const API_BASE = "http://localhost:3000";

const ProveedoresIA = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { t } = useTranslation();

  const askIA = async () => {
    if (!question.trim()) {
      alert(t("escribePregunta"));
      return;
    }

    setAnswer(t("pensando"));

    try {
      const resp = await fetch(`${API_BASE}/ia/consulta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, tipo: "proveedores" }),
      });

      const data = await resp.json();
      setAnswer(data.answer || t("sinrespuesta"));
    } catch (err) {
      console.error(err);
      setAnswer(t("error"));
    }
  };

  return (
    <div className="card p-4">
      <h3>{t("iaproveedores")}</h3>

      <textarea
        className="form-control mb-2"
        rows="3"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={t("escribeConsultaProveedor")}
      />

      <button className="btn btn-primary mb-3" onClick={askIA}>
        {t("pregunta")}
      </button>

      <div className="alert alert-info">{answer}</div>
    </div>
  );
};

export default ProveedoresIA;