
/**
 * IR / 8-BALL — Insomnio Records
 *
 * Selector de discos interactivo al final de /productos.
 *
 * Estados:
 * idle    -> esperando al usuario.
 * rolling -> bola en movimiento.
 * result  -> disco seleccionado.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import "../css/IR8Ball.css";

function IR8Ball() {

  // Reutilizamos el hook que consulta los discos de Firestore.
  const { products, loading, error } = useProducts();

  // Controla las tres etapas del minijuego.
  const [phase, setPhase] = useState("idle");

  // Almacena el disco elegido.
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Conservamos solamente productos con stock disponible.
  const availableProducts = products.filter(
    (product) => Number(product.stock) > 0
  );

  // Inicia una nueva consulta al destino.
  const handleRoll = () => {
    if (phase === "rolling" || loading || !availableProducts.length) {
      return;
    }

    // Limpiamos el resultado anterior.
    setSelectedProduct(null);

    // Activamos la animación.
    setPhase("rolling");
  };

  // React recibe el evento cuando termina la animación CSS.
  const handleAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.animationName !== "ir-ball-travel") return;
    if (phase !== "rolling") return;

    // Elegimos un índice aleatorio del catálogo disponible.
    const randomIndex = Math.floor(
      Math.random() * availableProducts.length
    );

    // Guardamos el producto seleccionado.
    setSelectedProduct(availableProducts[randomIndex]);

    // Mostramos el resultado.
    setPhase("result");
  };

  return (
    <section
      className="ir8-section"
      aria-label="IR / 8-BALL"
    >
      <div className="ir8-container">

        <div className="ir8-label">
          [IR / 8-BALL — EL DESTINO DECIDE]
        </div>

        {/* El escenario contiene la bola y los controles */}
        <div className="ir8-stage">

          {/* La bola permanece montada durante toda la experiencia */}
          <div
            className={`ir8-ball ${
              phase === "rolling" ? "ir8-ball--rolling" : ""
            }`}
            onAnimationEnd={handleAnimationEnd}
            role="img"
            aria-label="Bola ocho negra de billar"
          >
            <div className="ir8-ball-number">8</div>
          </div>

          {/* Contenido de la derecha */}
          <div
            className={`ir8-content ${
              phase === "rolling" ? "ir8-content--hidden" : ""
            }`}
          >

                {/* Estado inicial */}
                {phase === "idle" && (
                  <div className="ir8-intro">
                    <h2>Dejá que el azar elija.</h2>

                    <p>
                      No sabés qué escuchar. Nosotros tampoco.
                    </p>

                    <button
                      type="button"
                      className="ir8-button"
                      onClick={handleRoll}
                      disabled={
                        loading ||
                        Boolean(error) ||
                        availableProducts.length === 0
                      }
                    >
                      {loading
                        ? "SINTONIZANDO..."
                        : "CONSULTAR AL DESTINO ↗"}
                    </button>

                    {error && (
                      <p role="alert">
                        No pudimos cargar el catálogo.
                      </p>
                    )}

                    {!loading &&
                      !error &&
                      availableProducts.length === 0 && (
                        <p>
                          No hay discos disponibles para sortear.
                        </p>
                      )}
                  </div>
                )}

                {/* Resultado del sorteo */}
                {phase === "result" && selectedProduct && (
                  <div className="ir8-result">
                    <span className="ir8-result-label">
                      [ES EL DESTINO]
                    </span>

                    <div className="ir8-result-card">

                      {/* Portada del CD desde Firestore */}
                      <img
                        src={selectedProduct.img}
                        alt={`Portada de ${selectedProduct.name}`}
                        className="ir8-result-cover"
                      />

                      <div className="ir8-result-info">
                        <span className="ir8-result-artist">
                          {selectedProduct.artist || "Insomnio Records"}
                        </span>

                        <h2>{selectedProduct.name}</h2>

                        <Link
                          to={`/item/${selectedProduct.id}`}
                          className="ir8-result-link"
                        >
                          VER DISCO ↗
                        </Link>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="ir8-again"
                      onClick={handleRoll}
                      disabled={loading || availableProducts.length === 0}
                    >
                      OTRA FRECUENCIA ↻
                    </button>
                  </div>
                )}
          </div>
        </div>

        <p className="ir8-status" aria-live="polite">
          {phase === "rolling"
              ? "[CONSULTANDO FRECUENCIAS...]"
              : phase === "result"
                ? "[EL AZAR HA HABLADO]"
                : "[SEÑAL DISPONIBLE]"}
        </p>
      </div>
    </section>
  );
}

export default IR8Ball;
