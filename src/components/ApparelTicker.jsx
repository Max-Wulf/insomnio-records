
/**
 * CONTEXTO: Cinta animada de remeras de Insomnio Records.
 *
 * RESPONSABILIDADES:
 * - Recibir los diseños mediante la prop "designs".
 * - Mostrar una tarjeta por cada remera.
 * - Desplazar las tarjetas de derecha a izquierda.
 * - Pausar la animación al pasar el mouse o usar teclado.
 * - Navegar a /apparel/:slug al seleccionar una remera.
 *
 * IMPORTANTE:
 * Todavía no hay venta ni stock habilitados.
 */

import { Link } from "react-router-dom";
import "../css/ApparelTicker.css";

function ApparelTicker({ designs = [] }) {

  // Duplicamos el array para conseguir una cinta continua.
  // La segunda copia permite reiniciar la animación sin
  // dejar espacios vacíos entre el último y el primer diseño.
  const repeatedDesigns = [...designs, ...designs];

  // Si no existen diseños, no mostramos la cinta.
  if (designs.length === 0) {
    return null;
  }

  return (
    <section
      className="apparel-ticker"
      aria-label="Explorar diseños de remeras"
    >

      <header className="apparel-ticker-heading">
        <span className="signal-code">
          [ARCHIVO TEXTIL / IR-001]
        </span>

        <h2>Elegí tu frecuencia.</h2>

        <p>
          Siete diseños. Una misma señal.
        </p>
      </header>

      {/* Ventana que oculta las tarjetas fuera del área visible */}
      <div className="apparel-ticker-viewport">

        {/* Pista que se desplaza horizontalmente */}
        <div className="apparel-ticker-track">

          {repeatedDesigns.map((design, index) => {

            // El segundo conjunto es una copia visual.
            // No debe duplicar enlaces accesibles al teclado.
            const isDuplicate = index >= designs.length;

            return (
              <Link
                key={`${design.slug}-${index}`}
                to={`/apparel/${design.slug}`}
                className="apparel-ticker-card"
                aria-hidden={isDuplicate ? "true" : undefined}
                tabIndex={isDuplicate ? -1 : undefined}
              >

                {/* Imagen individual del diseño */}
                <div className="apparel-ticker-image">
                  {design.images?.front ? (
                    <img
                      src={design.images.front}
                      alt={isDuplicate ? "" : `Remera ${design.name}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="apparel-ticker-placeholder">
                      <span>{design.code}</span>
                      <strong>{design.name}</strong>
                    </div>
                  )}
                </div>

                {/* Información de la remera */}
                <div className="apparel-ticker-info">
                  <span className="signal-code">
                    {design.code}
                  </span>

                  <h3>{design.name}</h3>

                  <span className="apparel-ticker-link">
                    VER DISEÑO ↗
                  </span>
                </div>

              </Link>
            );
          })}

        </div>
      </div>

      <p className="apparel-ticker-note">
        [SEÑAL EN MOVIMIENTO / SELECCIONÁ UN DISEÑO]
      </p>

    </section>
  );
}

export default ApparelTicker;
