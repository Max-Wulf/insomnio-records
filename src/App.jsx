import NavbarRB from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import CartContainer from "./components/CartContainer";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import ApparelCatalog from "./components/ApparelCatalog";
import ApparelDetail from "./components/ApparelDetail";
import IRSays from "./components/IRSays";
import Error from "./components/Error";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavbarRB />

        <Routes>
          <Route path="/" element={<ItemListContainer saludo="Categoría " />} />
          <Route path="/category/:type" element={<ItemListContainer saludo="Categoría" />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/apparel" element={<ApparelCatalog />} />
          <Route path="/apparel/:slug" element={<ApparelDetail />} />
          <Route path="/ir-says" element={<IRSays />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
