import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Dashboard from "./dashboard/Dashboard";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <div className="container mt-5">Cargando...</div>;
  if (!user) return null;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <h4>CHUCULA DE MIS VIEJOS</h4>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <Dashboard />
    </div>
  );
};

export default Home;