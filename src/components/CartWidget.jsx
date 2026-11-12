/**
 * CONTEXTO: Ícono pixelado del carrito y contador de unidades leído desde CartContext.
 * Solo presenta el estado: el botón que lo envuelve en Navbar abre el panel lateral.
 */
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {
  const { cart, totalQty } = useContext(CartContext);

  return (
    <div className="cart-widget">
      <svg
        className="pixel-cart"
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="currentColor"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <path d="M1 3h5v3h16v9H9v2h12v2H7v-4H5V6H1V3zm7 5v5h12V8H8zM8 20h3v3H8v-3zm10 0h3v3h-3v-3z" />
        <path d="M11 8h2v5h-2zm5 0h2v5h-2z" />
      </svg>
      {cart.length > 0 && <span>{totalQty()}</span>}
    </div>
  );
};

export default CartWidget;
