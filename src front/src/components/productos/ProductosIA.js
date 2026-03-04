import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const API_BASE = "http://localhost:3000";

const ProductosIA = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { t } = useTranslation();

  const askIA = async () => {
    if (!question.trim()) return;

    setAnswer(t("pensando"));

    const resp = await fetch(`${API_BASE}/ia/consulta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, tipo: "productos" }),
    });

    const data = await resp.json();
    setAnswer(data.answer || t("sin respuesta"));
  };

  return (
    <div className="card p-4">
      <h3>{t("consulta", { defaultValue: "Consulta IA Productos" })}</h3>

      <textarea
        className="form-control mb-2"
        rows="3"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={askIA}>
        {t("pregunta", { defaultValue: "Pregunta" })}
      </button>

      <div className="alert alert-info">{answer}</div>
    </div>
  );
};

export default ProductosIA;