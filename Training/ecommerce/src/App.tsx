//import { useState ,useEffect} from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
// const [count, setCount] = useState(0)
//const navigate = useNavigate();

import "./App.css";

import APPHome from "../component/Home.tsx";
import ProductPage from "../component/ProductPage.tsx";
import Cart from "../component/Cart.tsx";
import Layout from "../component/layout.tsx";
import PageNotFound from "../component/layout.tsx";
import {CartProvider} from "../component/CartContext.tsx"

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
