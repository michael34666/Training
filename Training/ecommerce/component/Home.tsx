//import { useState } from "react";
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

const displayProducts = () => {};
const filter = () => {};
const filterByDate = () => {};
const filterByPriceRange = () => {};
const sortByPriceOrDate = () => {};
const AddToCart = () => {};
 case "date":
        return data.upload_date.sort(
          (a, b) =>
            Date.parse(
              new Date(a.initialRegistration.split("/").reverse().join("-"))
            ) -
            Date.parse(
              new Date(b.initialRegistration.split("/").reverse().join("-"))
            )
        );
*/
// const [productslist, setProductList] = useState([]);
//import DATA from './MOCK_DATA.csv';
//<button onClick={() => filterItems()}>filter by catagory</button>

import { useEffect, useState } from "react";
import { data } from "./MOCK_DATA";

const APPHome = () => {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState(data);
  //const [selectedCfilter, setSelectedFilter] = useState("catgory");

  useEffect(() => {
    setItems(data);
  }, data);

  const filterItemsCatgory = (filter: string) => {
    return items.filter((item) => item["category"] === filter);
  };

  const sortItemsPrice = () => {
    return data.sort((a , b) => a.price - b.price);
  };

  const sortItemsDate = () => {
    return data.sort(
      (a,b)=>
        a.split("/").reverse().join("") - b.split("/").reverse().join("")
    );
  };

  return (
    <>
      <button onClick={() => sortItemsPrice()}>sort by price</button>
      <button onClick={() => sortItemsDate()}>sort by Date</button>
      <br></br>
      <input
        type="text"
        value={filter}
        onChange={(mes) => setFilter(mes.target.value)}
        placeholder="What category do you want?  "
      />

      <button onClick={() => filterItemsCatgory(filter)}>
        filter the list
      </button>

      <ul>
        <ul>
          {items.map((data) => (
            <li>
              {data["Product_Name"]} {data["upload_date"]} {data["price"]}
            </li>
          ))}
        </ul>
      </ul>
    </>
  );
};

export default APPHome;
