/**
 * CONTEXTO: Cierre editorial compartido: variant selecciona el mensaje en apparelClosings.
 * productCode identifica la remera; la variante music agrega el texto del algoritmo. Sin variante válida no se renderiza.
 */
import { apparelClosings } from "../data/apparel";
import "../css/ApparelDetail.css";
import "../css/BroadcastTheme.css";

/** Cierre editorial por producto, independiente del footer de navegación compartido. */
const ProductEditorialFooter = ({ variant, productCode }) => {
  const closing = apparelClosings[variant];
  if (!closing) return null;
  return (
    <footer className={`product-editorial-footer product-editorial-footer--${variant}`} aria-label="Cierre de transmisión">
      <div className="product-footer-meta"><span>[Insomnio Records / {productCode || "music division"}]</span><span>03:17 AM</span></div>
      <span className="product-footer-label">{closing.code}</span>
      <p className="product-footer-headline">{closing.lines.map((line) => <span key={line}><span className="broadcast-highlight">{line}</span></span>)}</p>
      <p className="product-footer-punchline">[{closing.punchline}]</p>
      {variant === "music" && <p className="product-footer-algorithm">Nuestro algoritmo es un tipo con insomnio eligiendo discos.<br /><span>[Desde algún lugar de la madrugada.]</span></p>}
      <div className="product-footer-signoff"><span>[fin de la transmisión]</span><span>[insomnio]</span></div>
    </footer>
  );
};

export default ProductEditorialFooter;
