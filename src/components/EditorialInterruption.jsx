/**
 * CONTEXTO: Bloque editorial estático: number identifica la interrupción, tone elige el estilo y children aporta el mensaje.
 */
/** A static editorial break; its message stays readable without animation. */
const EditorialInterruption = ({ number, children, tone = "purple" }) => (
  <aside className={`editorial-interruption editorial-interruption--${tone}`} aria-label={`Interrupción ${number}`}>
    <span className="signal-code">[interrupción {number}]</span>
    <p>{children}</p>
    <span className="interruption-mark" aria-hidden="true">[ir]</span>
  </aside>
);

export default EditorialInterruption;
