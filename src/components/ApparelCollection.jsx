import { Link } from "react-router-dom";
import collectionImage from "../img/apparel-vol-001.png";
import surveillanceImage from "../img/apparel-vigilancia-total.png";
import midnightDesignsImage from "../img/apparel-ir-06-ir-07.png";
import "../css/Platform.css";
import { apparelDesigns } from "../data/apparel";
import "../css/ApparelDetail.css";

const ApparelCollection = ({ preview = false }) => (
    <section className="apparel-sector" id="apparel" aria-labelledby="apparel-title">
      <header className="apparel-heading">
        <div>
          <span className="signal-code">05 / apparel division</span>
          <h2 id="apparel-title">Después de medianoche.</h2>
          <p>{apparelDesigns.length} remeras. La misma interferencia.</p>
        </div>
        <span className="collection-stamp">VOL. 001<br /><span>[independiente]</span></span>
      </header>
      <figure className="apparel-artwork">
        <img src={collectionImage} alt="Colección Insomnio Records: frente y dorso de El Ojo, Señal Nocturna, Fuera de Frecuencia y Después de Medianoche." loading="lazy" width="1536" height="1024" />
        <figcaption>[IR-01 — IR-04 / frente + dorso]</figcaption>
      </figure>
      {!preview && <figure className="apparel-artwork">
        <img src={surveillanceImage} alt="IR-05, Vigilancia Total: frente con cámara y dorso con la Estatua de la Libertad rodeada de cámaras de vigilancia." loading="lazy" width="1536" height="1024" />
        <figcaption>[IR-05 / vigilancia total / frente + dorso]</figcaption>
      </figure>}
      {!preview && <figure className="apparel-artwork">
        <img src={midnightDesignsImage} alt="IR-06, Transmisión de Largo Alcance, con antena y luna; e IR-07, 03:17, con reloj digital y escritorio nocturno. Frente y dorso de ambos diseños." loading="lazy" width="1536" height="1024" />
        <figcaption>[IR-06 — IR-07 / transmisión de largo alcance + 03:17 / frente + dorso]</figcaption>
      </figure>}
      {!preview && <ol className="apparel-designs" aria-label="Diseños de la colección">
        {apparelDesigns.map(({ code, name, description, slug }) => (
          <li key={code}><span className="signal-code">{code}</span><h3>{name}</h3><p>{description}</p><Link to={`/apparel/${slug}`}>Ver diseño ↗</Link></li>
        ))}
      </ol>}
      {preview && <Link className="btn-purple apparel-more" to="/apparel">Ver más / catálogo de remeras <span aria-hidden="true">↗</span></Link>}
      <p className="apparel-release-note">[presentación de colección / venta próximamente]</p>
    </section>
);

export default ApparelCollection;
