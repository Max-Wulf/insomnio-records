/**
 * CONTEXTO: Selector de cantidad: conserva un mínimo de uno y un máximo dado por stock.
 * onAdd comunica la cantidad al padre; este componente no modifica el carrito directamente.
 */
import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import "../css/ItemCount.css";

const ItemCount = ({ stock, onAdd }) => {
  const [count, setCount] = useState(1);

  // Aumenta una unidad mientras no alcance el stock informado por la ficha.
  const sumar = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  // Disminuye una unidad sin permitir cero ni valores negativos.
  const restar = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="item-count">

      <div className="counter">
        <button onClick={restar}>
         -
        </button>

        <span>{count}</span>

        <button onClick={sumar}>
          +
        </button>
      </div>

      <button
        className="btn-purple"
        onClick={() => onAdd(count)}
        disabled={stock === 0}
      >
        <BsCart3 />
        Agregar al carrito
      </button>

    </div>
  );
};

export default ItemCount;