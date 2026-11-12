/**
 * CONTEXTO: Página /ir-says: terminal de frases con paletas de colores y contador decorativo.
 * El estado guarda índices y cantidad de transmisiones; NEXT cambia frase y paleta sin repetición inmediata.
 */
import { useState } from "react";
import { irMessages, irPalettes, nextIndex } from "../data/irMessages";
import "../css/IRSays.css";

const IRSays = () => {
  const [screen, setScreen] = useState({ message: 0, palette: 0, count: 1 });
  const message = irMessages[screen.message];
  const palette = irPalettes[screen.palette];
  // Selecciona índices distintos a los actuales y aumenta el contador; no hay puntaje ni compras.
  const next = () => setScreen({ message: nextIndex(screen.message, irMessages.length), palette: nextIndex(screen.palette, irPalettes.length), count: screen.count + 1 });
  return (
    <main className="ir-says" aria-labelledby="ir-says-title" style={{ "--ir-screen": palette.background, "--ir-detail": palette.accent }}>
      <header className="ir-says-heading">
        <span>INSOMNIO RECORDS // EXPERIMENTAL BROADCAST</span>
        <h1 id="ir-says-title">[IR] SAYS<span aria-hidden="true">_</span></h1>
        <p>UNAUTHORIZED THOUGHTS // 03:17 AM</p>
      </header>
      <section className="ir-says-console" aria-label="Terminal de transmisiones">
        <div className="ir-says-hud"><span>MSG_{String(screen.count).padStart(3, "0")}</span><span>CREDITS: ∞</span></div>
        <div className="ir-says-screen">
          <div className="ir-says-hud"><span>■ SIGNAL ACTIVE</span><span>HI-SCORE 0317</span></div>
          <div className="ir-says-message" aria-live="polite" aria-atomic="true">
            <div key={screen.count} className="ir-says-reveal"><p className="ir-says-main">{message.main}</p><p className="ir-says-sub">[{message.sub}]</p></div>
          </div>
          <div className="ir-says-controls"><span aria-hidden="true">▪ ▪ ▪<br />▪ ▪</span><button type="button" onClick={next}>NEXT &gt;&gt;</button></div>
        </div>
        <div className="ir-says-bottom">PRESS NEXT TO CONTINUE // NO REFUNDS</div>
      </section>
      <aside className="ir-says-signoff"><p>BUENO, TENÍAMOS QUE USAR LAS FRASES BRILLANTES QUE NOS SOBRARON.</p><p>[DIJO NUNCA NADIE.]</p></aside>
    </main>
  );
};
export default IRSays;
