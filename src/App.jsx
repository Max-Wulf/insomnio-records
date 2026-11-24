
/**
 * CONTEXTO: Mapa de navegación de Insomnio Records.
 *
 * - Home conserva ItemListContainer.
 * - CatalogPage administra el catálogo de CDs.
 * - Navbar y Footer son compartidos.
 * - CartProvider comparte el estado del carrito.
 */

import NavbarRB from "./components/Navbar";

import ItemListContainer from "./components/ItemListContainer";
import CatalogPage from "./components/CatalogPage";
import SearchResults from "./components/SearchResults"

import ItemDetailContainer from "./components/ItemDetailContainer";
import CartContainer from "./components/CartContainer";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";

import ApparelCatalog from "./components/ApparelCatalog";
import ApparelDetail from "./components/ApparelDetail";

import IRSays from "./components/IRSays";
import UserAccount from "./components/UserAccount";
import Error from "./components/Error";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>

          {/* Navegación compartida */}
          <NavbarRB />

          <Routes>

            {/* HOME: conserva el diseño actual */}
            <Route
              path="/"
              element={<ItemListContainer />}
            />

            {/* CATÁLOGO: todos los CDs */}
            <Route
              path="/productos"
              element={<CatalogPage />}
            />

            {/* CATÁLOGO: filtrado por categoría */}
            <Route
              path="/category/:type"
              element={<CatalogPage />}
            />
            {/* DETALLE DE UN DISCO */}
            <Route
              path="/item/:id"
              element={<ItemDetailContainer />}
            />

            {/* Buscador: ruta del buscador del navbar*/}
            <Route 
            path="/search" 
            element={<SearchResults />} 
            />

            {/* CARRITO Y COMPRA */}
            <Route
              path="/cart"
              element={<CartContainer />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/order-confirmation/:orderId"
              element={<OrderConfirmation />}
            />

            {/* APPAREL */}
            <Route
              path="/apparel"
              element={<ApparelCatalog />}
            />

            <Route
              path="/apparel/:slug"
              element={<ApparelDetail />}
            />

            {/* JUEGO */}
            <Route
              path="/ir-says"
              element={<IRSays />}
            />

            {/* USUARIO */}
            <Route
              path="/mi-cuenta"
              element={<UserAccount />}
            />

            {/* RUTA NO ENCONTRADA */}
            <Route
              path="*"
              element={<Error />}
            />

          </Routes>

          {/* Pie de página compartido */}
          <Footer />

        </CartProvider>
      </AuthProvider>  
    </BrowserRouter>
  );
}

export default App;
