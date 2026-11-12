/**
 * CONTEXTO: Comprobante local: prepara, valida y recupera el resumen de la última compra de esta pestaña.
 * sessionStorage no es una fuente de confianza para autenticar pedidos ni un historial remoto.
 */
export const RECEIPT_KEY = "insomnio-last-receipt-v1";

/** Copia únicamente los datos comerciales; nunca conserva los datos del comprador. */
export function createReceipt(orderId, cart, total) {
  const items = cart.map(({ id, name, artist, quantity, price }) => ({
    id: String(id), name, artist: artist || "", quantity, price,
  }));
  const receipt = { version: 1, orderId, items, total };
  if (!isValidReceipt(receipt, orderId)) throw new Error("El resumen del pedido no es válido.");
  return receipt;
}

/** Comprueba estructura, cantidades y consistencia del resumen local; no autentica una orden remota. */
export function isValidReceipt(receipt, orderId) {
  return Boolean(receipt && receipt.version === 1 && typeof orderId === "string" && orderId.length > 0 &&
    receipt.orderId === orderId && Array.isArray(receipt.items) && receipt.items.length > 0 &&
    Number.isFinite(receipt.total) && receipt.total >= 0 &&
    receipt.items.every((item) => item && typeof item.id === "string" && typeof item.name === "string" &&
      Number.isInteger(item.quantity) && item.quantity > 0 && Number.isFinite(item.price) && item.price >= 0) &&
    Math.abs(receipt.items.reduce((sum, item) => sum + item.price * item.quantity, 0) - receipt.total) < .01);
}

/** Solo persiste el comprobante después de que la escritura remota haya terminado correctamente.
 * Si el navegador bloquea el almacenamiento, devuelve igualmente el resumen para navegar con state.
 */
export async function completeOrder({ commit, receipt, storage }) {
  if (!isValidReceipt(receipt, receipt?.orderId)) throw new Error("El resumen del pedido no es válido.");
  await commit();
  try {
    (storage ?? globalThis.sessionStorage)?.setItem(RECEIPT_KEY, JSON.stringify(receipt));
  } catch {
    // La orden ya se guardó. Un fallo local no debe presentarse como compra fallida.
  }
  return receipt;
}

/** Recupera la última compra de esta pestaña sin realizar escrituras ni repetir el checkout. */
export function readReceipt(orderId, storage) {
  try {
    const receipt = JSON.parse((storage ?? globalThis.sessionStorage)?.getItem(RECEIPT_KEY) || "null");
    return isValidReceipt(receipt, orderId) ? receipt : null;
  } catch {
    return null;
  }
}
