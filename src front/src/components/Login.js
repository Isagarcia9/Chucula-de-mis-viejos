import { useTranslation } from "react-i18next";
import { auth, loginWithGoogle, registerWithEmail, loginWithEmail, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { t, i18n } = useTranslation();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  // Redirige automáticamente al usuario autenticado a la página principal
 // useEffect(() => {
   // if (!loading && user) {
     // navigate("/", { replace: true });
    //}
  //}, [user, loading, navigate]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [error, setError] = useState(null);

  //hace la navegación apenas se autentica 
  useEffect(()=>{
    if(!loading && user){
      navigate("/", {replace: true});
    }
  }, [user, loading, navigate]);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegistering) {
        if (!name.trim()) throw new Error(t("requiredName", { defaultValue: "El nombre es obligatorio." }));
        if (!maritalStatus) throw new Error(t("requiredMarital", { defaultValue: "Selecciona tu estado civil." }));
        if (password.length < 6) throw new Error(t("passwordMin", { defaultValue: "La contraseña debe tener al menos 6 caracteres." }));
        await registerWithEmail(email, password, name.trim(), maritalStatus);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="container mt-4 text-center">Cargando…</div>;
  if (user) return null; // Si hay usuario, solo redirige (useEffect)

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <div className="card shadow p-4">
        <div className="d-flex justify-content-center mb-3">
          <div className="btn-group">
            <button onClick={() => handleLanguageChange("en")} className={`btn btn-sm ${i18n.language === "en" ? "btn-primary" : "btn-outline-secondary"}`}>🇬🇧 EN</button>
            <button onClick={() => handleLanguageChange("es")} className={`btn btn-sm ${i18n.language === "es" ? "btn-primary" : "btn-outline-secondary"}`}>🇪🇸 ES</button>
            <button onClick={() => handleLanguageChange("fr")} className={`btn btn-sm ${i18n.language === "fr" ? "btn-primary" : "btn-outline-secondary"}`}>🇫🇷 FR</button>
          </div>
        </div>

        <h2 className="text-center mb-3">
          {isRegistering ? t("register", { defaultValue: "Registrarse" }) : t("login", { defaultValue: "Iniciar sesión" })}
        </h2>

        <form onSubmit={handleAuth}>
          {isRegistering && (
            <>
              <div className="mb-3">
                <label className="form-label">{t("name", { defaultValue: "Nombre" })}</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("namePlaceholder", { defaultValue: "Tu nombre" })} />
              </div>

              <div className="mb-3">
                <label className="form-label">{t("maritalStatus", { defaultValue: "Estado Civil" })}</label>
                <select className="form-select" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
                  <option value="">{t("selectMarital", { defaultValue: "Seleccione…" })}</option>
                  <option value="single">{t("single", { defaultValue: "Soltero/a" })}</option>
                  <option value="married">{t("married", { defaultValue: "Casado/a" })}</option>
                  <option value="cohabiting">{t("cohabiting", { defaultValue: "Unión libre" })}</option>
                  <option value="divorced">{t("divorced", { defaultValue: "Divorciado/a" })}</option>
                  <option value="widowed">{t("widowed", { defaultValue: "Viudo/a" })}</option>
                  <option value="other">{t("other", { defaultValue: "Otro" })}</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">{t("email", { defaultValue: "Correo Electrónico" })}</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPlaceholder", { defaultValue: "correo@dominio.com" })} />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("password", { defaultValue: "Contraseña" })}</label>
            <input type="password" className="form-control" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("passwordPlaceholder", { defaultValue: "Mínimo 6 caracteres" })} />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">
            {isRegistering ? t("register", { defaultValue: "Registrarse" }) : t("signIn", { defaultValue: "Ingresar" })}
          </button>

          <button type="button" className="btn btn-link w-100 mt-2" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering
              ? t("alreadyAccount", { defaultValue: "¿Ya tienes cuenta? Inicia sesión" })
              : t("noAccount", { defaultValue: "¿No tienes cuenta? Regístrate" })}
          </button>

          <button onClick={loginWithGoogle} type="button" className="btn btn-dark mt-3 w-100">
            {t("signInWithGoogle", { defaultValue: "Iniciar sesión con Google" })}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
