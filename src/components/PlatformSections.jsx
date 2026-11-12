/**
 * CONTEXTO: Secciones editoriales del Home: señal nocturna, frecuencia y adelanto de Apparel.
 * Compone banners y enlaces existentes, sin manejar compras ni consultas a Firestore.
 */
import TransmissionBanner from "./TransmissionBanner";
import { Link } from "react-router-dom";
import { transmissions } from "../data/transmissions";
import ApparelCollection from "./ApparelCollection";
import signalBanner from "../img/senal-nocturna-banner.png";

const PlatformSections = () => (
  <>
    <TransmissionBanner {...transmissions.midnight} />

    <section className="signal-sector" aria-labelledby="signal-title">
      <div className="signal-heading" id="senal-nocturna">
        <span className="signal-code">03 / señal nocturna</span>
        <h2 id="signal-title" className="visually-hidden">Señal Nocturna — Los clásicos no se olvidan. Lo nuevo no se pierde.</h2>
        <img className="signal-artwork-banner" src={signalBanner} alt="Insomnio Records: Señal Nocturna. Los clásicos no se olvidan. Lo nuevo no se pierde. Televisor ilustrado con un ojo en pantalla." loading="lazy" />
        <p>Videoclips, selecciones musicales y descubrimientos.</p>
      </div>
      <div className="signal-editorial-grid">
        <div><span className="signal-code">[archivo abierto]</span><h3>El tiempo no baja el volumen.</h3><p>Esos discos que volvés a escuchar. Y los que todavía no sabés que necesitás.</p></div>
        <div><span className="signal-code">[sin horario de cierre]</span><h3>Una señal para los que siguen.</h3><p>Nos tomamos en serio la música. [A nosotros, no tanto.]</p></div>
      </div>
      <div className="frequency-block" id="fuera-de-frecuencia">
        <span className="signal-code">04 / fuera de frecuencia</span>
        <h2>Fuera de Frecuencia.</h2>
        <TransmissionBanner {...transmissions.frequency} />
        <p>Bandas emergentes, rarezas y música fuera del algoritmo.</p>
        <span className="frequency-stamp">[no ajuste su criterio]</span>
      </div>
    </section>

    <Link className="transmission-banner-link" to="/apparel/el-ojo" aria-label="Ver El Ojo, IR-01">
      <TransmissionBanner {...transmissions.paranoia} />
      <span className="transmission-banner-action">Ver El Ojo / IR-01 <span aria-hidden="true">↗</span></span>
    </Link>

    <ApparelCollection preview />

  </>
);

export default PlatformSections;
