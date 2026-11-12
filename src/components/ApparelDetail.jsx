/**
 * CONTEXTO: Página /apparel/:slug: busca el diseño local, muestra frente/dorso y su cierre editorial.
 * IR-01 usa el banner de observación; los otros diseños usan ProductEditorialFooter. Un slug desconocido tiene salida propia.
 */
import { Link, useParams } from "react-router-dom";
import { apparelDesigns } from "../data/apparel";
import ProductEditorialFooter from "./ProductEditorialFooter";
import TransmissionBanner from "./TransmissionBanner";
import { transmissions } from "../data/transmissions";
import "../css/ApparelDetail.css";

const ApparelDetail = () => {
  const { slug } = useParams();
  const design = apparelDesigns.find((item) => item.slug === slug);
  if (!design) return <main className="apparel-detail"><h1>Diseño no encontrado.</h1><Link className="checkout-home" to="/apparel">Volver a la colección</Link></main>;
  return (
    <main className="apparel-detail" key={design.code}>
      <nav className="apparel-detail-breadcrumb" aria-label="Ubicación"><Link to="/">Inicio</Link><span>/</span><Link to="/apparel">Apparel Division</Link><span>/</span><span aria-current="page">{design.code}</span></nav>
      <header className="apparel-detail-heading"><span className="signal-code">VOL. 001 / Después de Medianoche / {design.code}</span><h1>{design.name}</h1><p>{design.description}</p></header>
      <figure className="apparel-detail-artwork">
        <svg viewBox={design.frame} role="img" aria-label={`${design.name}: diseño de frente y dorso`}>
          <image href={design.image} width="1536" height="1024" />
        </svg>
        <figcaption>[{design.code} / frente + dorso / diseño original]</figcaption>
      </figure>
      <section className="apparel-detail-availability" aria-label="Disponibilidad"><span className="signal-code">[presentación de colección]</span>{design.note && <p>{design.note}</p>}<p>Venta próximamente. Los precios, talles y disponibilidad se publicarán con el lanzamiento.</p></section>
      <nav className="apparel-related" aria-label="Otros diseños de la colección">
        {apparelDesigns.filter((item) => item.code !== design.code).map((item) => <Link key={item.code} to={`/apparel/${item.slug}`}><span>{item.code}</span>{item.name} ↗</Link>)}
      </nav>
      {design.code === "IR-01"
        ? <TransmissionBanner {...transmissions.observation} />
        : <ProductEditorialFooter variant={design.closing} productCode={design.code} />}
      <Link className="btn-purple apparel-detail-back" to="/apparel">Volver a la colección ↗</Link>
    </main>
  );
};

export default ApparelDetail;
