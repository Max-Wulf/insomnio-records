
/**
 * CONTEXTO: Catálogo completo de CDs.
 *
 * - Obtiene los productos desde Firestore mediante useProducts.
 * - Filtra los discos según la categoría de la URL.
 * - Permite navegar entre categorías.
 * - Reutiliza ItemList para mostrar las tarjetas.
 *
 * PENDIENTE:
 * - Buscador del navbar.
 * - El sorteo de discos del IR / 8-BALL.
 */

import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useProducts } from "../hooks/useProducts";
import ItemList from "./ItemList";
import IR8Ball from "./IR8Ball";
import LoaderComponent from "./LoaderComponent";

import "../css/ItemListContainer.css";
import "../css/Platform.css";
import "../css/CatalogPage.css";

function CatalogPage() {

  const ballSection = useRef(null);
  const { hash } = useLocation();

  // Esperamos al cat?logo para que su altura no desplace el destino del enlace.
  // Traemos los productos de Firestore.
  const { products, loading, error } = useProducts();

  useEffect(() => {
    if (hash === "#ir-8-ball" && !loading) {
      ballSection.current?.scrollIntoView({ block: "start" });
    }
  }, [hash, loading]);

  // Lee la categoría desde la URL.
  // Ejemplo: /category/nacional -> "nacional"
  const { type } = useParams();

  // Permite navegar a otra ruta desde JavaScript.
  const navigate = useNavigate();

  // Si no existe type, mostramos todos los productos.
  const activeCategory = type || "todos";

  // Filtramos los productos según la categoría elegida.
  const filteredProducts = products.filter((prod) => {
    if (activeCategory === "todos") {
      return true;
    }

    return prod.categoria === activeCategory;
  });

  // Opciones disponibles para filtrar.
  const categories = [
    { value: "todos", label: "Todos" },
    { value: "nacional", label: "Nacionales" },
    { value: "internacional", label: "Internacionales" },
  ];

  return (
    <main className="item-list-container">

      <section
        className="music-sector"
        aria-label="Catálogo de discos"
      >

        {/* Encabezado del catálogo */}
        <header className="home-intro">
          <span className="broadcast-label">
            02 / discos — [archivo sonoro]
          </span>

          <h1>Discos para seguir despierto.</h1>

          <p>
            Explorá nuestro catálogo y encontrá
            tu próximo disco.
          </p>
        </header>

        {/* Botones de categorías */}
        <div
          className="catalog-filters"
          role="group"
          aria-label="Filtrar discos por categoría"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              className={
                activeCategory === category.value
                  ? "catalog-filter active"
                  : "catalog-filter"
              }
              aria-pressed={
                activeCategory === category.value
              }
              onClick={() => {

                // Si selecciona Todos, va a /productos.
                // Si selecciona otra categoría, cambia la URL.
                if (category.value === "todos") {
                  navigate("/productos");
                } else {
                  navigate(`/category/${category.value}`);
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Estado de carga */}
        {loading && (
          <LoaderComponent text="Cargando discos..." />
        )}

        {/* Error de Firestore */}
        {!loading && error && (
          <p role="alert">{error}</p>
        )}

        {/* Productos disponibles */}
        {!loading && !error && (
          filteredProducts.length > 0 ? (
            <ItemList data={filteredProducts} />
          ) : (
            <p>No encontramos discos en esta categoría.</p>
          )
        )}

      </section>

      {/* Selector aleatorio de discos */}
        <section id="ir-8-ball" ref={ballSection}>
          <IR8Ball />
        </section>

    </main>
  );
}

export default CatalogPage;
