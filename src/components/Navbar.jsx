/**
 * CONTEXTO: Navegación compartida: expanded controla el menú y openCart controla el panel del carrito.
 * Al elegir un enlace o abrir el carrito se cierra el menú; usuario y carrito están dentro del panel desplegable.
 * El buscador es visual por ahora: todavía no filtra productos ni ejecuta búsquedas.
 */
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "../css/InsomnioIdentity.css";
import CartDrawer from "./CartDrawer";
import CartWidget from "./CartWidget";
import UserWidget from "./UserWidget";
import "../css/Navbar.css";

function NavbarRB() {
  const [openCart, setOpenCart] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setExpanded(false);
    setSearch("");
  };

  return (
    <>
      <Navbar expand="lg" expanded={expanded} onToggle={setExpanded} className="navbar-insomnio">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" onClick={() => setExpanded(false)}>
            <span className="insomnio-wordmark" aria-label="Insomnio, inicio">[insomnio]</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label={expanded ? "Cerrar menú" : "Abrir menú"} />

          <Navbar.Collapse id="basic-navbar-nav" className="navbar-content">
            <form className="search-box" onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar en el catálogo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button type="submit" aria-label="Buscar">
                <BsSearch aria-hidden="true" />
              </button>
            </form>
            <div className="navbar-actions">
            <NavLink to="/mi-cuenta" className="user-navbar-btn" aria-label="Mi cuenta"
              title="Mi cuenta" onClick={() => setExpanded(false)}>
              <UserWidget />
            </NavLink>
            <button
              type="button"
              className="cart-navbar-btn"
              aria-label="Abrir carrito"
              onClick={() => { setExpanded(false); setOpenCart(true); }}
            >
              <CartWidget />
            </button>
            </div>
            <Nav className="nav-links" onSelect={() => setExpanded(false)}>
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>

              <NavDropdown title="Productos" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/category/nacional">
                  Nacionales
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/category/internacional">
                  Internacionales
                </NavDropdown.Item>
                {/* Merch utiliza el catálogo independiente de Apparel */}
                <NavDropdown.Item
                  as={NavLink}
                  to="/apparel"
                  onClick={() => setExpanded(false)}
                >
                  Merch
                </NavDropdown.Item>
                
              </NavDropdown>
              <Nav.Link href="/#senal-nocturna">Señal nocturna</Nav.Link>
              <Nav.Link href="/#apparel">Apparel</Nav.Link>
              <Nav.Link as={NavLink} to="/ir-says">IR SAYS</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CartDrawer isOpen={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}

export default NavbarRB;
