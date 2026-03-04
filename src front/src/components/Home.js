import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) {
      if (user.displayName) setName(user.displayName);
      else if (user.email) setName(user.email.split("@")[0]);
      else setName("");
    } else if (!loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p className="fs-5 text-muted">{t("loading", { defaultValue: "Cargando..." })}</p>
      </div>
    );
  }
  if (!user) {
    // Si no hay usuario y no está cargando, ya se redirige en el useEffect
    return null;
  }
  return (
    <div className="container mt-5" style={{ maxWidth: 720 }}>
      <div className="card shadow p-4">
        <h1 className="text-primary mb-3">{t("homeTitle", { defaultValue: "🏠 Inicio" })}</h1>
        <p className="fs-5 fw-bold">
          {t("hello", { defaultValue: "Hola" })} {name}
        </p>
        <button className="btn btn-outline-danger" onClick={() => logout()}>
          {t("logout", { defaultValue: "Cerrar sesión" })}
        </button>
      </div>
    </div>
  );
};

export default Home;
