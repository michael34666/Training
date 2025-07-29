/*
import { useState } from "react";

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

import { data } from "./MOCK_DATA";

const ProductPage = () => {
  const [items, setItems] = useState([data]);

  //const [selectedCfilter, setSelectedFilter] = useState("catgory");

  useEffect(() => {
    setItems(data);
  }, data);

  return (
    <>
      <h1>The Product Page</h1>
      <ul>
        <ul>
          {items.map((data) => (
            <li key={data}>
              {data["Product_Name"]}, {data["upload_date"]},{" "}
              {data["description"]} {data["price"]}
              <br></br>
              {data["category"]},{data["sub_category"]}
              <br></br>
              <img src={data["image_url"]}></img>
            </li>
          ))}
        </ul>
      </ul>
    </>
  );
};

export default ProductPage;
