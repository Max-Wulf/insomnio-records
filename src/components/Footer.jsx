import "../css/Footer.css";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaSpotify } from "react-icons/fa";
import TransmissionBanner from "./TransmissionBanner";
import { transmissions } from "../data/transmissions";
import "../css/FooterGame.css";

const Footer = () => {
  const { pathname } = useLocation();
  const route = pathname.replace(/\/+$/, "") || "/";
  const isProductRoute = route === "/apparel" || route.startsWith("/apparel/")
    || route.startsWith("/item/") || route.startsWith("/category/");
  const theme = isProductRoute ? "monochrome" : "home";
  return (
    <footer className={`footer transmission-footer footer-game footer-game--${theme}`}>
      <div className="footer-broadcast">
        <div className="footer-station">
          <Link to="/" className="footer-wordmark" aria-label="Insomnio, inicio">[insomnio]</Link>
          <span className="footer-on-air">[seguimos acá]</span>
        </div>

        <div className="footer-message">
          <TransmissionBanner {...transmissions.institution} compact />
          <nav aria-label="Navegación del pie de página" className="footer-links">
            <Link to="/">catálogo <span aria-hidden="true">↗</span></Link>
            <div className="footer-socials" role="group" aria-label="Redes sociales">
              <span className="footer-social" role="img" aria-label="Instagram" title="Instagram">
                <FaInstagram aria-hidden="true" />
              </span>
              <span className="footer-social" role="img" aria-label="Spotify" title="Spotify">
                <FaSpotify aria-hidden="true" />
              </span>
            </div>
          </nav>
        </div>

        <span className="footer-side-label">[lado b / fin de transmisión]</span>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Insomnio Records.</span>
        <span className="footer-signoff">[podés cerrar la pestaña.<br />el disco sigue.]</span>
      </div>
    </footer>
  );
};

export default Footer;
