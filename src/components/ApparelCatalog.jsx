/**
 * CONTEXTO: Página /apparel: presenta la colección completa reutilizando ApparelCollection.
 */
import { Link } from "react-router-dom";
import ApparelCollection from "./ApparelCollection";

const ApparelCatalog = () => (
  <main className="apparel-catalog">
    <Link className="apparel-back" to="/">← Volver a la disquería</Link>
    <h1 className="apparel-catalog-title">Apparel Division</h1>
    <ApparelCollection />
  </main>
);

export default ApparelCatalog;
