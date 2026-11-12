import test from "node:test";
import assert from "node:assert/strict";
import { createReceipt, completeOrder, readReceipt, RECEIPT_KEY } from "../src/service/orderReceipt.js";

const cart = [{ id: "disc-1", name: "Disco", artist: "Artista", price: 2500, quantity: 2 }];
const storage = () => {
  const entries = new Map();
  return { setItem: (key, value) => entries.set(key, value), getItem: (key) => entries.get(key) ?? null };
};

test("el resumen copia productos y excluye datos personales", () => {
  const receipt = createReceipt("order-real-from-adapter", cart, 5000);
  const original = cart[0].name;
  cart[0].name = "Modificado";
  assert.equal(receipt.items[0].name, original);
  cart[0].name = original;
  assert.deepEqual(Object.keys(receipt).sort(), ["items", "orderId", "total", "version"]);
});

test("no persiste ni confirma antes de que termine el commit", async () => {
  const store = storage();
  let resolveCommit;
  const pending = new Promise((resolve) => { resolveCommit = resolve; });
  let completed = false;
  const receipt = createReceipt("order-1", cart, 5000);
  const result = completeOrder({ commit: () => pending, receipt, storage: store }).then((value) => { completed = true; return value; });
  assert.equal(store.getItem(RECEIPT_KEY), null);
  assert.equal(completed, false);
  resolveCommit();
  assert.equal((await result).orderId, "order-1");
  assert.equal(readReceipt("order-1", store).total, 5000);
});

test("una compra fallida no genera comprobante", async () => {
  const store = storage();
  await assert.rejects(completeOrder({
    commit: async () => { throw new Error("Stock insuficiente"); },
    receipt: createReceipt("failed-order", cart, 5000), storage: store,
  }), /Stock insuficiente/);
  assert.equal(readReceipt("failed-order", store), null);
});

test("el resumen sobrevive al vaciado del carrito y puede recuperarse sin otra compra", async () => {
  const store = storage();
  const localCart = cart.map((item) => ({ ...item }));
  let commits = 0;
  await completeOrder({ commit: async () => { commits++; }, receipt: createReceipt("saved-order", localCart, 5000), storage: store });
  localCart.length = 0;
  assert.equal(readReceipt("saved-order", store).items.length, 1);
  assert.equal(readReceipt("saved-order", store).total, 5000);
  assert.equal(commits, 1);
});

test("rechaza IDs ajenos, almacenamiento corrupto y totales inconsistentes", () => {
  const store = storage();
  store.setItem(RECEIPT_KEY, JSON.stringify(createReceipt("saved-order", cart, 5000)));
  assert.equal(readReceipt("unknown-order", store), null);
  store.setItem(RECEIPT_KEY, "invalid-json");
  assert.equal(readReceipt("saved-order", store), null);
  assert.throws(() => createReceipt("bad-total", cart, 3));
});

test("el bloqueo de sessionStorage no convierte una orden guardada en fallida", async () => {
  const blockedStorage = { setItem() { throw new Error("Storage blocked"); } };
  const receipt = await completeOrder({ commit: async () => {}, receipt: createReceipt("saved-order", cart, 5000), storage: blockedStorage });
  assert.equal(receipt.orderId, "saved-order");
});

test("un resumen inválido se rechaza antes de escribir la orden", async () => {
  let called = false;
  await assert.rejects(completeOrder({ commit: async () => { called = true; }, receipt: { orderId: "bad" }, storage: storage() }));
  assert.equal(called, false);
});
