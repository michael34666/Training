/*
interface products {
  name: string;
  date: string;
  Description: string;
  price: number;
  sellerName: string;
  imageUrl: string;
  category: string;
  addInfo: string;
}
interface category {
  name: string;
}
interface order {
  orderDate: string;
  listOfProd: products;
}

const showImg = () => {};
*/

import { useEffect, useState } from "react";
import { data } from "./MOCK_DATA_IPHONE";
import { useCart } from "./CartContext";

const ProductPage = () => {
  const [items, setItems] = useState(data);
  const { addToCart } = useCart();

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <>
      <h1>Product Page</h1>
      <ul className="Ul">
        
        {items.map((item :any ) => (
          
          <li key={item['id']} className="Li">
            <h2>{item['Product_Name']}</h2>
            <img src={item['image_url']} alt={item['Product_Name']} />
            <p>Date: {item['upload_date']}</p>
            <p>Description: {item['description']}</p>
            <p>Price: {item['price']}$ </p>
            <p>Category: {item['category']}</p>
            <br></br>
            <button onClick={() => addToCart(item)}> Add to Cart</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductPage;
