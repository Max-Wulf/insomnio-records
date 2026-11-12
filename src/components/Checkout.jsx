import { useState, useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { collection,doc,runTransaction,serverTimestamp,} from "firebase/firestore";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import { createReceipt, completeOrder } from "../service/orderReceipt";
import EmptyCart from "./EmptyCart";
import { useForm } from "react-hook-form";
import "../css/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const submitting = useRef(false);
  const [loading, setLoading] = useState(false);

  const { cart, total, clear } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const terminarCompra = async (data) => {
    if (submitting.current || cart.length === 0) return;
    submitting.current = true;

    setLoading(true);

    try {
      const { name, lastname, address, email } = data;

      const orderColl = collection(db, "orders");
      const orderRef = doc(orderColl);

      const productos = cart.map((item) => ({
        ref: doc(db, "products", String(item.id)),
        quantity: item.quantity,
        id: item.id,
      }));

      const pendingReceipt = createReceipt(orderRef.id, cart, total());
      const receipt = await completeOrder({
        receipt: pendingReceipt,
        commit: () => runTransaction(db, async (transaction) => {
          // Primero leemos todos los productos.
          const snapshots = [];

          for (const producto of productos) {
            const snapshot = await transaction.get(producto.ref);

            if (!snapshot.exists()) {
              throw new Error(`El producto ${producto.id} no existe.`);
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

          // Después de todas las lecturas, actualizamos el stock.
          productos.forEach((producto, index) => {
            const stockActual = snapshots[index].data().stock;

            transaction.update(producto.ref, {
              stock: stockActual - producto.quantity,
            });
          });

          // Creamos la orden dentro de la misma transacción.
          transaction.set(orderRef, {
            comprador: { name, lastname, address, email },
            carrito: cart,
            total: pendingReceipt.total,
            fecha: serverTimestamp(),
          });
        }),
      });

      navigate(`/order-confirmation/${orderRef.id}`, { state: { receipt }, replace: true });
      clear();
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert(error.message || "No se pudo completar la compra.");
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <main className="checkout-page">
        <div className="checkout-container">
          <h1>Finalizar compra</h1>

          <p className="checkout-subtitle">
            Completá tus datos para generar la orden.
          </p>

          <form
            className="checkout-form"
            onSubmit={(event) => handleSubmit(terminarCompra)(event)}
          >
            <input
              type="text"
              placeholder="Nombre"
              {...register("name", { required: true, minLength: 3 })}
            />
            {errors?.name && (
              <small>Complete este campo.</small>
            )}

            <input
              type="text"
              placeholder="Apellido"
              {...register("lastname", { required: true, minLength: 2 })}
            />
            {errors?.lastname && (
              <small>Complete este campo.</small>
            )}

            <input
              type="text"
              placeholder="Dirección"
              {...register("address", {
                required: true,
                minLength: 10,
                maxLength: 35,
              })}
            />
            {errors?.address && (
              <small>Complete este campo.</small>
            )}

            <input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", { required: true })}
            />
            {errors?.email && (
              <small>Complete este campo.</small>
            )}

            <input
              type="email"
              placeholder="Repetí tu correo"
              {...register("secondemail", {
                required: true,
                validate: {
                  equalsMails: (mail2) =>
                    mail2 === getValues().email,
                },
              })}
            />

            {errors?.secondemail?.type === "required" && (
              <small>Complete este campo.</small>
            )}

            {errors?.secondemail?.type === "equalsMails" && (
              <small>Los correos no coinciden.</small>
            )}

            <button
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
