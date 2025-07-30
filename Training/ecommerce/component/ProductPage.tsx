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
import { data } from "./MOCK_DATA";

const ProductPage = () => {
  const [items, setItems] = useState(data);

  //const [selectedCfilter, setSelectedFilter] = useState("catgory");

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <>
      <h1>Product Page</h1>
      <ul>
        <ul className="Ul">
          {items.map((data) => (
            <li className="Li">
              Product_Name :{data["Product_Name"]}, Date: {data["upload_date"]},{" "}
              Description: {data["description"]} Price: {data["price"]}
              <br></br>
              {data["category"]}, {data["sub_category"]}
              <br></br>
              <img src={data["image_url"]} alt={data["Product_Name"]} />
            </li>
          ))}
        </ul>
      </ul>
    </>
  );
};

export default ProductPage;
