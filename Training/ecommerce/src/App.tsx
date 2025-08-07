import "./App.css";

import APPHome from "./pages/Home/Home.tsx";
import ProductPage from "./pages/Product/ProductPage.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Layout from "./pages/Layout/Layout.tsx";
import PageNotFound from "./pages/NotFound/NotFound.tsx";
import { CartProvider } from "./context/CartContext/CartContextProvider.tsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<APPHome />} />
            <Route path="/product/{id}" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
