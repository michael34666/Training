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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
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
  );
};

export default App;
/*
 <>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ecommerce App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>



     <Router>
      <h1>Ecommerce App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="">Product page</Link>
          </li>
          <li>
            <Link to="">Cart page</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" element={<APPHome/>}/>
      
    </Router>
    */
