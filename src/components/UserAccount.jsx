import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../service/firebase";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "../css/UserAccount.css";

const UserAccount = () => {
  // Estados del componente
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");

  // Limpiar los campos de contraseña
  const clearPasswords = () => {
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  // Limpiar los mensajes
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // Registro e inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (isRegister && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

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

      clearPasswords();
    } catch (err) {
      console.error(err.code);
      setError(getErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  // Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    clearMessages();
    setSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      clearPasswords();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    clearMessages();
    setSubmitting(true);

    try {
      await signOut(auth);

      setEmail("");
      setIsRegister(false);
      clearPasswords();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  // Recuperar contraseña
  const handleResetPassword = async () => {
    clearMessages();

    if (!email.trim()) {
      setError("Ingresá tu correo electrónico.");
      return;
    }

    setSubmitting(true);

    const resetMessage =
      "Si existe una cuenta asociada, recibirás un correo para restablecer tu contraseña.";

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setSuccess(resetMessage);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setSuccess(resetMessage);
      } else {
        setError(getErrorMessage(err.code));
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Cambiar entre login y registro
  const handleToggleRegister = () => {
    setIsRegister((prev) => !prev);
    clearMessages();
    clearPasswords();
  };

  // Mensajes de error de Firebase
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "El correo electrónico no es válido.";

      case "auth/email-already-in-use":
        return "Ya existe una cuenta con este correo.";

      case "auth/weak-password":
        return "La contraseña debe cumplir los requisitos de seguridad.";

      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Correo o contraseña incorrectos.";

      case "auth/too-many-requests":
        return "Demasiados intentos. Probá más tarde.";

      case "auth/popup-closed-by-user":
        return "Se canceló el acceso con Google.";

      case "auth/popup-blocked":
        return "El navegador bloqueó la ventana de Google.";

      case "auth/network-request-failed":
        return "Error de conexión. Intentá nuevamente.";

      case "auth/unauthorized-domain":
        return "Este dominio no está autorizado en Firebase.";

      case "auth/user-disabled":
        return "Esta cuenta se encuentra deshabilitada.";

      default:
        return "Ocurrió un error. Intentá nuevamente.";
    }
  };

  // Pantalla de carga
  if (loading) {
    return (
      <main className="user-account">
        <p>Verificando sesión...</p>
      </main>
    );
  }

  // Renderizado del componente
  return (
    <main
      className="user-account"
      aria-labelledby="user-account-title"
    >
      <span>[Insomnio Records / acceso de usuarios]</span>

      <h1 id="user-account-title">Mi cuenta</h1>

      {user ? (
        /* Perfil del usuario autenticado */
        <section className="account-profile">
          <h2>
            Bienvenido, {user.displayName || user.email}
          </h2>

          <p>{user.email}</p>

          <p>[Seguimos al aire.]</p>

          <button
            type="button"
            onClick={handleLogout}
            disabled={submitting}
          >
            Cerrar sesión
          </button>
        </section>
      ) : (
        /* Formulario de autenticación */
        <section className="auth-container">
          <h2>
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h2>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {/* Correo electrónico */}
            <label htmlFor="email">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={submitting}
              required
            />

            {/* Contraseña */}
            <label htmlFor="password">
              Contraseña
            </label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  isRegister
                    ? "new-password"
                    : "current-password"
                }
                minLength={isRegister ? 6 : undefined}
                disabled={submitting}
                required
              />

              {/* Mostrar u ocultar contraseña */}
              <button
                type="button"
                className="password-toggle"
                aria-label={
                  showPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>

            {/* Confirmación de contraseña */}
            {isRegister && (
              <>
                <label htmlFor="confirmPassword">
                  Confirmar contraseña
                </label>

                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  autoComplete="new-password"
                  minLength={6}
                  disabled={submitting}
                  required
                />
              </>
            )}

            {/* Botón principal */}
            <button type="submit" disabled={submitting}>
              {submitting
                ? "Procesando..."
                : isRegister
                  ? "Registrarme"
                  : "Ingresar"}
            </button>
          </form>

          {/* Recuperar contraseña */}
          {!isRegister && (
            <button
              type="button"
              className="forgot-password"
              onClick={handleResetPassword}
              disabled={submitting}
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}

          {/* Autenticación con Google */}
          <button
            type="button"
            className="google-login"
            onClick={handleGoogleLogin}
            disabled={submitting}
          >
            Continuar con Google
          </button>

          {/* Cambiar entre login y registro */}
          <button
            type="button"
            className="auth-toggle"
            disabled={submitting}
            onClick={handleToggleRegister}
          >
            {isRegister
              ? "¿Ya tenés cuenta? Iniciá sesión"
              : "¿No tenés cuenta? Registrate"}
          </button>

          {/* Identidad de Insomnio Records */}
          <p className="auth-signature">
            BROADCASTING FROM NOWHERE.
            <br />
            RECEIVED EVERYWHERE.
          </p>
        </section>
      )}

      {/* Mensaje de error */}
      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      {/* Mensaje de éxito */}
      {success && (
        <p className="auth-success" role="status">
          {success}
        </p>
      )}
    </main>
  );
};

export default UserAccount;
