import Carousel from "react-bootstrap/Carousel";
import "../css/InsomnioIdentity.css";
import "../css/HomeCarousel.css";

import frusciante from "../img/jhon.png";
import hendrix from "../img/jimmy.png";
import cobain from "../img/kurt.png";
import homme from "../img/homme.png";
import yorke from "../img/yorke.png";

function HomeCarousel() {
  return (
    <Carousel
      className="home-carousel"
      fade
      controls={false}
      interval={3500}
      pause="hover"
      touch
      keyboard
    >
      <Carousel.Item className="slide-transmission" interval={6000}>
        <div className="transmission-card">
          <span className="transmission-status">[señal nocturna / vol. 01]</span>
          <div className="transmission-message">
            <span className="broadcast-label">[son las 03:17]</span>
            <h2>un disco más.<br />[después te dormís.]</h2>
            <p>La música no duerme. [Nosotros tampoco.]</p>
            <a className="carousel-btn" href="#catalogo">explorar catálogo <span aria-hidden="true">↗</span></a>
          </div>
          <span className="transmission-signature">[insomnio]</span>
        </div>
      </Carousel.Item>

      <Carousel.Item className="slide-frusciante">
        <img className="carousel-img" src={frusciante} alt="Frusciante" />

        <Carousel.Caption>
          <span className="broadcast-label">[en rotación]</span>
          <h2>La música no duerme.</h2>
          <p>Dale otra vuelta al disco.</p>
            <a className="carousel-btn" href="#catalogo">
                EXPLORAR CATÁLOGO
            </a>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="slide-hendrix">
        <img className="carousel-img" src={hendrix} alt="Hendrix" />

        <Carousel.Caption>
          <span className="broadcast-label">[en rotación]</span>
          <h2>Esto se escucha fuerte.</h2>
          <p>Encontrá tu próximo favorito.</p>
            <a className="carousel-btn" href="#catalogo">
                EXPLORAR CATÁLOGO
            </a>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="slide-cobain">
        <img className="carousel-img" src={cobain} alt="Cobain" />

        <Carousel.Caption>
          <span className="broadcast-label">[en rotación]</span>
          <h2>No era una fase.</h2>
          <p>Ese disco todavía te mueve algo.</p>
            <a className="carousel-btn" href="#catalogo">
                EXPLORAR CATÁLOGO
            </a>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="slide-homme">
        <img className="carousel-img" src={homme} alt="Josh Homme" />

        <Carousel.Caption>
          <span className="broadcast-label">[en rotación]</span>
          <h2>Rock sin límites.</h2>
          <p>Vinilos, CDs y clásicos inolvidables.</p>
            <a className="carousel-btn" href="#catalogo">
                EXPLORAR CATÁLOGO
            </a>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="slide-yorke">
        <img className="carousel-img" src={yorke} alt="Thom Yorke" />

        <Carousel.Caption>
          <span className="broadcast-label">[en rotación]</span>
          <h2>Escuchá diferente.</h2>
          <p>Descubrí música para cualquier momento.</p>
          <a className="carousel-btn" href="#catalogo">
                EXPLORAR CATÁLOGO
          </a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
