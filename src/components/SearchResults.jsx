import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";
import ItemList from "./ItemList";
import LoaderComponent from "./LoaderComponent";
import "../css/ItemListContainer.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const itemsCollection = collection(db, "items");

    getDocs(itemsCollection)
      .then((res) => {
        const list = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(list);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const normalize = (text) =>
    String(text ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const searchTerm = normalize(query);

  const filteredProducts = searchTerm
    ? data.filter((prod) =>
        [prod.name, prod.artist].some((field) =>
          normalize(field).includes(searchTerm)
        )
      )
    : [];

  return (
    <main className="item-list-container">
      <section className="music-sector">
        <header className="music-category-heading">
          <span className="signal-code">
            [búsqueda de frecuencia]
          </span>

          <h1>Resultados para "{query}"</h1>
        </header>

        {loading ? (
          <LoaderComponent text="Buscando discos..." />
        ) : error ? (
          <p>No pudimos cargar el catálogo.</p>
        ) : filteredProducts.length > 0 ? (
          <>
            <p>
              {filteredProducts.length} producto(s)
              encontrado(s)
            </p>

            <ItemList data={filteredProducts} />
          </>
        ) : (
          <p>No encontramos discos para esta búsqueda.</p>
        )}
      </section>
    </main>
  );
};

export default SearchResults;