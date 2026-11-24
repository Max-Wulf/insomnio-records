import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../service/firebase";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Detectamos si existe una sesión activa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Registro e inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      }

      setPassword("");
    } catch (err) {
      console.error(err.code);
      setError(getErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  // Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    setError("");
    setSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    setError("");

    try {
      await signOut(auth);
      setEmail("");
      setPassword("");
      setIsRegister(false);
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  // Mensajes de error
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "El correo electrónico no es válido.";

      case "auth/email-already-in-use":
        return "Ya existe una cuenta con este correo.";

      case "auth/weak-password":
        return "La contraseña debe cumplir los requisitos de seguridad.";

      case "auth/invalid-credential":
        return "Correo o contraseña incorrectos.";

      case "auth/too-many-requests":
        return "Demasiados intentos. Probá más tarde.";

      case "auth/popup-closed-by-user":
        return "Se canceló el acceso con Google.";

      case "auth/network-request-failed":
        return "Error de conexión. Intentá nuevamente.";

      default:
        return "Ocurrió un error. Intentá nuevamente.";
    }
  };

  if (loading) {
    return (
      <main className="user-account">
        <p>Verificando sesión...</p>
      </main>
    );
  }

  return (
    <main
      className="user-account"
      aria-labelledby="user-account-title"
    >
      <span>[Insomnio Records / acceso de usuarios]</span>

      <h1 id="user-account-title">Mi cuenta</h1>

      {user ? (
        <section className="account-profile">
          <h2>Bienvenido, {user.displayName || user.email}</h2>

          <p>{user.email}</p>

          <p>[Seguimos al aire.]</p>

          <button type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </section>
      ) : (
        <section className="auth-container">
          <h2>
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                isRegister ? "new-password" : "current-password"
              }
              minLength={isRegister ? 6 : undefined}
              required
            />

            <button type="submit" disabled={submitting}>
              {submitting
                ? "Procesando..."
                : isRegister
                  ? "Registrarme"
                  : "Ingresar"}
            </button>
          </form>

          <button
            type="button"
            className="google-login"
            onClick={handleGoogleLogin}
            disabled={submitting}
          >
            Continuar con Google
          </button>

          <button
            type="button"
            className="auth-toggle"
            disabled={submitting}
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setPassword("");
            }}
          >
            {isRegister
              ? "¿Ya tenés cuenta? Iniciá sesión"
              : "¿No tenés cuenta? Registrate"}
          </button>
        </section>
      )}

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
    </main>
  );
};

export default UserAccount;