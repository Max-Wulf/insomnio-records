/**
 * CONTEXTO: Lista presentacional: recibe data ya cargada y genera una tarjeta Item por producto.
 */
import React from 'react'
import Item from './Item'

const ItemList = ({ data }) => {
  return (
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    gap: "2rem",
    padding: "40px 80px",
  }}
>
      {data.map((prod) => (
        <Item key={prod.id} prod={prod} />
      ))}
    </div>
  );
};

export default ItemList