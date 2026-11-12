import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import LoaderComponent from "./LoaderComponent";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";
import HomeCarousel from "./HomeCarousel";
import PlatformSections from "./PlatformSections";
import ProductEditorialFooter from "./ProductEditorialFooter";
import "../css/Platform.css";
import "../css/ItemListContainer.css"

const ItemListContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { type } = useParams();

  useEffect(() => {
    setLoading(true);

    const itemsCollection = collection(db, "items");

    getDocs(itemsCollection)
      .then((res) => {
        const list = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const productosFiltrados = type
          ? list.filter((prod) => prod.categoria === type)
          : list;

        setData(productosFiltrados);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [type]);

 return (
  <main className="item-list-container">

    {!type && <HomeCarousel />}

    <section className="music-sector" aria-label="Catálogo de discos">
    {!type && (
      <section className="home-intro" id="catalogo">
        <span className="broadcast-label">02 / discos — [seguimos al aire]</span>
        <h1>Discos para seguir despierto.</h1>
        <p>
          Vinilos, CDs y algo que todavía no escuchaste.
        </p>
      </section>
    )}

    {type && <header className="music-category-heading"><span className="signal-code">[archivo sonoro]</span><h1>Discos / {type.replaceAll("-", " ")}</h1></header>}

    {loading ? (
      <LoaderComponent text="Cargando productos..." />
    ) : (
      <ItemList data={data} />
    )}
    </section>

    <ProductEditorialFooter variant="music" />

    {!type && <PlatformSections />}

  </main>
);}

export default ItemListContainer;
