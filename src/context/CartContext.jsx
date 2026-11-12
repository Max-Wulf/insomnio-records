/**
 * CONTEXTO: Estado compartido del carrito. Recupera y persiste productos en localStorage.
 * El stock se controla aquí con los datos locales y se vuelve a comprobar en Firestore al comprar.
 */
import { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

// Provee el carrito y sus operaciones a todos los componentes descendientes.
export const CartProvider = ({ children }) => {

  // Inicialización diferida: lee el almacenamiento una vez; JSON inválido vuelve al carrito vacío.
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("insomnio-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

    // Sincroniza cada cambio del carrito con el almacenamiento persistente del navegador.
    useEffect(() => {
      localStorage.setItem("insomnio-cart",JSON.stringify(cart));
    }, [cart]);

  // Indica si existe un producto con ese ID; no consulta stock remoto.
  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  // Agrega o acumula unidades con cantidades enteras positivas y sin superar el stock local.
  // Usa el estado anterior para evitar perder cambios si React agrupa actualizaciones.
  const addItem = (item, qty) => {
    if (
      !Number.isInteger(qty) ||
      qty <= 0 ||
      !Number.isInteger(item.stock) ||
      item.stock < 0
    ) {
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (prod) => prod.id === item.id
      );

      const currentQty = existingProduct?.quantity ?? 0;

      if (currentQty + qty > item.stock) {
        console.warn("No hay suficiente stock disponible");
        return prevCart;
      }

      if (existingProduct) {
        return prevCart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + qty }
            : prod
        );
      }

      return [...prevCart, { ...item, quantity: qty }];
    });
  };

  // Resta una unidad; si quedaba solo una, elimina el producto del carrito.
  const decreaseItem = (id) => {
    setCart((prevCart) =>
      prevCart.flatMap((prod) => {
        if (prod.id !== id) return [prod];

        if (prod.quantity <= 1) {
          return [];
        }

        return [{
          ...prod,
          quantity: prod.quantity - 1,
        }];
      })
    );
  };

  // Vacía el carrito en memoria; el efecto de persistencia actualiza localStorage.
  const clear = () => {
    setCart([]);
  };

  // Elimina toda la línea del producto, independientemente de su cantidad.
  const removeItem = (id) => {
    setCart((prevCart) =>
      prevCart.filter((prod) => prod.id !== id)
    );
  };

  // Suma precio por cantidad de todos los productos, sin recargos.
  const total = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);
  };

  // Devuelve el total multiplicado por 1.5. Es un recargo fijo; no determina impuestos reales.
  const totalImp = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0) * 1.5;
  };

  // Cuenta unidades totales, no la cantidad de productos distintos.
  const totalQty = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        decreaseItem,
        clear,
        removeItem,
        isInCart,
        total,
        totalImp,
        totalQty,
        
      }}

    >
      {children}
    </CartContext.Provider>
  );
};