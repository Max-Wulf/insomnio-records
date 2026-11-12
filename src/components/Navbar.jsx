import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "../css/InsomnioIdentity.css";
import CartDrawer from "./CartDrawer";
import CartWidget from "./CartWidget";
import "../css/Navbar.css";

function NavbarRB() {
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="navbar-insomnio">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <span className="insomnio-wordmark" aria-label="Insomnio, inicio">[insomnio]</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className="navbar-content">
            <Nav className="nav-links">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>

              <NavDropdown title="Productos" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/category/nacional">
                  Nacionales
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/category/internacional">
                  Internacionales
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/category/grandes-exitos">
                  Grandes Exitos
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/#senal-nocturna">Señal nocturna</Nav.Link>
              <Nav.Link href="/#apparel">Apparel</Nav.Link>
              <Nav.Link as={NavLink} to="/ir-says">IR SAYS</Nav.Link>
            </Nav>

            <div className="search-box">
              <input type="text" placeholder="Buscar..." />
              <BsSearch />
            </div>

            <button
              className="cart-navbar-btn"
              aria-label="Abrir carrito"
              onClick={() => setOpenCart(true)}
            >
              <CartWidget />
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CartDrawer isOpen={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}

export default NavbarRB;
