import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../service/firebase";
import { useAuth } from "../context/AuthContext";
import "../css/OrderHistory.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(price);

const formatDate = (date) =>
  date?.toDate().toLocaleDateString("es-AR") ||
  "Fecha pendiente";

const OrderHistory = () => {
  const { user } = useAuth();
  const userId = user?.uid;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Consultar los pedidos del usuario autenticado
  useEffect(() => {
    let active = true;

    setOrders([]);
    setError("");

    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");

        const q = query(
          ordersRef,
          where("userId", "==", userId)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));

        // Ordenar desde la compra más reciente
        data.sort(
          (a, b) =>
            (b.fecha?.toMillis() ?? 0) -
            (a.fecha?.toMillis() ?? 0)
        );

        if (active) {
          setOrders(data);
        }
      } catch (err) {
        console.error("Error al consultar pedidos:", err);

        if (active) {
          setError("No se pudo cargar el historial de compras.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      active = false;
    };
  }, [userId]);

  if (!userId) return null;

  return (
    <section
      className="order-history"
      aria-labelledby="order-history-title"
    >
      <span className="history-label">
        [ ARCHIVO DE TRANSMISIONES ]
      </span>

      <h2 id="order-history-title">Mis compras</h2>

      {/* Estado de carga */}
      {loading && (
        <p className="history-status" role="status">
          Recuperando transmisiones...
        </p>
      )}

      {/* Error de consulta */}
      {error && (
        <p className="history-error" role="alert">
          {error}
        </p>
      )}

      {/* Historial vacío */}
      {!loading && !error && orders.length === 0 && (
        <div className="history-empty">
          <span>[ SIN REGISTROS ]</span>

          <h3>Todavía no realizaste compras.</h3>

          <p>
            Tu próxima transmisión empieza en nuestro catálogo.
          </p>
        </div>
      )}

      {/* Listado de pedidos */}
      {!loading && !error && orders.map((order) => (
        <article className="history-order" key={order.id}>

          {/* Encabezado del pedido */}
          <header className="history-order-header">
            <div>
              <span>NÚMERO DE PEDIDO</span>

              <h3>#{order.id}</h3>
            </div>

            <time>{formatDate(order.fecha)}</time>
          </header>

          {/* Productos comprados */}
          <div className="history-items">
            {order.carrito.map((item) => (
              <div className="history-item" key={item.id}>

                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                />

                <div className="history-item-info">
                  <h4>{item.name}</h4>

                  <p>{item.artist}</p>

                  <span>Cantidad: {item.quantity}</span>
                </div>

                <strong className="history-item-price">
                  {formatPrice(item.price * item.quantity)}
                </strong>
              </div>
            ))}
          </div>

          {/* Total del pedido */}
          <footer className="history-order-footer">
            <span>TOTAL DEL PEDIDO</span>

            <strong>{formatPrice(order.total)}</strong>
          </footer>

        </article>
      ))}

      <p className="history-signature">
        BROADCASTING FROM NOWHERE.
        <br />
        RECEIVED EVERYWHERE.
      </p>
    </section>
  );
};

export default OrderHistory;