/**
 * CONTEXTO: Página /order-confirmation/:orderId: muestra el comprobante tras una compra exitosa.
 * Prioriza el state de navegación y luego sessionStorage. No vuelve a comprar ni consulta el pedido remoto.
 */
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { isValidReceipt, readReceipt } from "../service/orderReceipt";
import TransmissionBanner from "./TransmissionBanner";
import { transmissions } from "../data/transmissions";
import "../css/OrderConfirmation.css";

// Formatea importes en pesos argentinos para cada línea y el total del comprobante.
const money = (value) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(value);

/** Presenta el comprobante de una transacción exitosa; esta pantalla nunca genera órdenes. */
const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const receipt = isValidReceipt(state?.receipt, orderId) ? state.receipt : readReceipt(orderId);
  const [copyStatus, setCopyStatus] = useState("");

  // Copia el ID al portapapeles y muestra un estado legible si el navegador rechaza el permiso.
  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(receipt.orderId);
      setCopyStatus("Número de pedido copiado.");
    } catch {
      setCopyStatus("No se pudo copiar. Podés seleccionar el código y copiarlo manualmente.");
    }
  };

  if (!receipt) return (
    <main className="order-confirmation">
      <span className="transmission-banner-code">[sin comprobante en esta pestaña]</span>
      <h1>No pudimos recuperar el pedido.</h1>
      <p>Esta dirección por sí sola no confirma una compra. El resumen se conserva en la pestaña donde finalizaste el checkout.</p>
      <Link className="checkout-home" to="/">Volver al catálogo</Link>
    </main>
  );

  return (
    <main className="order-confirmation">
      <header>
        <span className="transmission-banner-code">[Insomnio Records / transmisión finalizada]</span>
        <h1>Tu pedido fue registrado.</h1>
        <p className="order-confirmation-code">ORDER ID // <strong>#{receipt.orderId}</strong></p>
        <button type="button" className="btn-purple" onClick={copyOrderId}>Copiar número de pedido</button>
        <p className="order-copy-status" role="status">{copyStatus}</p>
      </header>
      <section className="order-receipt" aria-labelledby="receipt-title">
        <h2 id="receipt-title">[resumen del pedido]</h2>
        <ul>{receipt.items.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <div><strong>{item.name}</strong><span>{item.artist}</span><span>{item.quantity} × {money(item.price)}</span></div>
            <strong>{money(item.price * item.quantity)}</strong>
          </li>
        ))}</ul>
        <p className="order-receipt-total"><span>Total registrado</span><strong>{money(receipt.total)}</strong></p>
      </section>
      <TransmissionBanner {...transmissions.institution} compact />
      <p className="order-farewell">Gracias por mantener viva la señal.</p>
      <p className="transmission-punchline">[Podés cerrar la pestaña. El disco sigue.]</p>
      <Link className="checkout-home" to="/">Volver al catálogo ↗</Link>
    </main>
  );
};

export default OrderConfirmation;
