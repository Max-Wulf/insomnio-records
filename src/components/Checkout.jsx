/**
 * CONTEXTO: Página /checkout de Insomnio Records.
 *
 * - Requiere autenticación.
 * - Asocia cada pedido al UID del usuario.
 * - Valida los datos mediante react-hook-form.
 * - Controla el stock mediante una transacción atómica.
 * - Evita envíos duplicados.
 * - Genera un comprobante tras confirmar la compra.
 *
 * PENDIENTE: validar precios y totales desde un backend
 * confiable antes de implementar ventas reales.
 */

import { useState, useContext, useRef } from "react";

import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../service/firebase";

import { useNavigate, Link } from "react-router-dom";

import {
  createReceipt,
  completeOrder,
} from "../service/orderReceipt";

import EmptyCart from "./EmptyCart";
import { useForm } from "react-hook-form";

import "../css/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const submitting = useRef(false);
  const [loading, setLoading] = useState(false);

  // Contexto del carrito
  const { cart, total, clear } = useContext(CartContext);

  // Contexto de autenticación
  const {
    user,
    loading: authLoading,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Finalizar compra
  const terminarCompra = async (data) => {
    if (submitting.current || cart.length === 0) return;

    // Comprobamos que exista una sesión activa
    if (!user || auth.currentUser?.uid !== user.uid) {
      navigate("/mi-cuenta");
      return;
    }

    submitting.current = true;
    setLoading(true);

    try {
      const { name, lastname, address } = data;

      // Identidad del usuario autenticado
      const userId = user.uid;
      const email = user.email;

      const orderColl = collection(db, "orders");
      const orderRef = doc(orderColl);

      // Referencias a los productos de Firestore
      const productos = cart.map((item) => ({
        ref: doc(db, "items", String(item.id)),
        quantity: item.quantity,
        id: item.id,
      }));

      // Preparamos el comprobante
      const pendingReceipt = createReceipt(
        orderRef.id,
        cart,
        total()
      );

      const receipt = await completeOrder({
        receipt: pendingReceipt,

        commit: () =>
          runTransaction(db, async (transaction) => {
            const snapshots = [];

            // Primero realizamos todas las lecturas
            for (const producto of productos) {
              const snapshot = await transaction.get(
                producto.ref
              );

              if (!snapshot.exists()) {
                throw new Error(
                  `El producto ${producto.id} no existe.`
                );
              }

              const stock = snapshot.data().stock;

              if (
                !Number.isInteger(producto.quantity) ||
                producto.quantity <= 0 ||
                !Number.isInteger(stock) ||
                stock < producto.quantity
              ) {
                throw new Error(
                  `Stock insuficiente para el producto ${producto.id}.`
                );
              }

              snapshots.push(snapshot);
            }

            // Actualizamos el stock
            productos.forEach((producto, index) => {
              const stockActual =
                snapshots[index].data().stock;

              transaction.update(producto.ref, {
                stock: stockActual - producto.quantity,
              });
            });

            // Creamos la orden asociada al usuario
            transaction.set(orderRef, {
              userId,

              comprador: {
                name,
                lastname,
                address,
                email,
              },

              carrito: cart,
              total: pendingReceipt.total,
              fecha: serverTimestamp(),
            });
          }),
      });

      // Navegamos únicamente después de confirmar la compra
      navigate(
        `/order-confirmation/${orderRef.id}`,
        {
          state: { receipt },
          replace: true,
        }
      );

      clear();
    } catch (error) {
      console.error(
        "Error al finalizar la compra:",
        error
      );

      alert(
        error.message ||
          "No se pudo completar la compra."
      );
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  // Esperamos a que Firebase compruebe la sesión
  if (authLoading) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <p>Verificando sesión...</p>
        </div>
      </main>
    );
  }

  // Carrito vacío
  if (!cart.length) {
    return <EmptyCart />;
  }

  // Usuario no autenticado
  if (!user) {
    return (
      <main className="checkout-page">
        <div className="checkout-container checkout-auth">
          <span>[ACCESO REQUERIDO]</span>

          <h1>Iniciá sesión</h1>

          <p>
            Para finalizar tu compra necesitás una cuenta
            en Insomnio Records.
          </p>

          <Link
            to="/mi-cuenta"
            className="checkout-btn"
          >
            Iniciar sesión / Registrarme
          </Link>

          <Link
            to="/cart"
            className="checkout-back"
          >
            Volver al carrito
          </Link>
        </div>
      </main>
    );
  }

  // Formulario de compra
  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h1>Finalizar compra</h1>

        <p className="checkout-subtitle">
          Completá tus datos para generar la orden.
        </p>

        {/* Cuenta asociada a la compra */}
        <div className="checkout-user">
          <span>COMPRANDO COMO</span>
          <strong>{user.email}</strong>
        </div>

        <form
          className="checkout-form"
          onSubmit={handleSubmit(terminarCompra)}
        >
          <input
            type="text"
            placeholder="Nombre"
            autoComplete="given-name"
            {...register("name", {
              required: true,
              minLength: 3,
            })}
          />

          {errors?.name && (
            <small>Ingresá un nombre válido.</small>
          )}

          <input
            type="text"
            placeholder="Apellido"
            autoComplete="family-name"
            {...register("lastname", {
              required: true,
              minLength: 2,
            })}
          />

          {errors?.lastname && (
            <small>Ingresá un apellido válido.</small>
          )}

          <input
            type="text"
            placeholder="Dirección"
            autoComplete="street-address"
            {...register("address", {
              required: true,
              minLength: 10,
              maxLength: 35,
            })}
          />

          {errors?.address && (
            <small>Ingresá una dirección válida.</small>
          )}

          <button
            type="submit"
            className="checkout-btn"
            disabled={loading}
          >
            {loading
              ? "Procesando compra..."
              : "Finalizar compra"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Checkout;