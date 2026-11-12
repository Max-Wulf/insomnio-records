import { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("insomnio-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

    useEffect(() => {
      localStorage.setItem("insomnio-cart",JSON.stringify(cart));
    }, [cart]);

  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

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

  const clear = () => {
    setCart([]);
  };

  const removeItem = (id) => {
    setCart((prevCart) =>
      prevCart.filter((prod) => prod.id !== id)
    );
  };

  const total = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);
  };

  const totalImp = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0) * 1.5;
  };

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