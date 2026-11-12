/**
 * CONTEXTO: Banner editorial compartido: recibe código, frases, remate, variante y gráfico opcional.
 * compact reduce la presentación; el componente es visual y no consulta datos.
 */
import "../css/TransmissionBanner.css";
import "../css/BroadcastTheme.css";

/** Banner editorial estático. El remate siempre se presenta entre corchetes. */
const TransmissionBanner = ({ code, lines, punchline, label, variant = "midnight", graphic, compact = false }) => (
  <aside className={`transmission-banner transmission-banner--${variant}${compact ? " transmission-banner--compact" : ""}`} aria-label={code}>
    <div className="transmission-banner-copy">
      <span className="transmission-banner-code">[{code}]</span>
      {graphic === "clock" && <span className="transmission-clock">03:17 <small>AM</small></span>}
      <p className="transmission-banner-headline">{lines.map((line) => <span key={line}><span className="broadcast-highlight">{line}</span></span>)}</p>
      <p className="transmission-punchline">[{punchline}]</p>
      <span className="transmission-banner-label">{label}</span>
    </div>
    {graphic === "clock" && <span className="transmission-corner-signature">[insomnio]</span>}
    {graphic === "antenna" && (
      <svg className="transmission-symbol" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="80" cy="60" r="12" /><path d="M55 35a35 35 0 0 0 0 50m50-50a35 35 0 0 1 0 50M39 19a57 57 0 0 0 0 82m82-82a57 57 0 0 1 0 82M80 60l-25 88m25-88 25 88M64 118h32m-24-28h16M52 148h56" />
      </svg>
    )}
    {graphic === "eye" && (
      <svg className="transmission-symbol" viewBox="0 0 180 140" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M8 32V8h24m116 0h24v24M8 108v24h24m116 0h24v-24M25 70q65-65 130 0-65 65-130 0Z" /><circle cx="90" cy="70" r="23" /><circle cx="90" cy="70" r="8" fill="currentColor" /><path d="M90 20v12m0 76v12M15 70h10m130 0h10" />
      </svg>
    )}
  </aside>
);

export default TransmissionBanner;
