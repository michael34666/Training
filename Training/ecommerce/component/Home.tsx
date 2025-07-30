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

*/
// const [productslist, setProductList] = useState([]);
//import DATA from './MOCK_DATA.csv';
//<button onClick={() => filterItems()}>filter by catagory</button>

import { useEffect, useState } from "react";
import { data } from "./MOCK_DATA";

const APPHome = () => {
  const [filter, setFilter] = useState("");
  const [prodName, setProdName] = useState("");
  const [items, setItems] = useState([data]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [date, setDate] = useState("");
  //const [selectedCfilter, setSelectedFilter] = useState("catgory");

  useEffect(() => {
    setItems(data);
  }, []);

  const filterItemsCatgory = (filter: string) => {
    if (filter.trim() === "") {
      alert("Enter a valid category");
      return;
    }
    const filterList = items.filter((items) => items["category"] == filter);
    setItems(filterList);
  };

  const filterItemsName = (prodName: string) => {
    if (prodName.trim() === "") {
      alert("Enter a valid product name");
      return;
    }
    const filterList = items.filter(
      (items) => items["Product_Name"] == prodName
    );
    setItems(filterList);
  };

  const filterItemsPrice = (minPrice: Number, maxPrice: Number) => {
    if (minPrice > maxPrice) {
      alert("min price Have to be <= then max price");
      return;
    }
    const filterPrice = items.filter(
      (items) => items["price"] >= minPrice && items["price"] <= maxPrice
    );
    setItems(filterPrice);
  };

  const filterItemsDate = (date: string) => {
    if (date.trim() === "" || date.includes("-")) {
      alert("Enter a valid date- in formet of MM/DD/YYYY");
      return;
    }
    const filterDate = items.filter((items) => items["upload_date"] === date);
    setItems(filterDate);
  };

  const sortItemsPrice = () => {
    const sorted = [...data].sort((a: any, b: any) => a.price - b.price);
    setItems(sorted);
  };

  const showAllProd = () => {
    setItems(data);
  };

  const sortItemsDate = () => {
    const ans = [...data].sort(
      (a: any, b: any) =>
        new Date(a.upload_date).getTime() - new Date(b.upload_date).getTime()
    );
    setItems(ans);
  };

  return (
    <>
      <button onClick={() => sortItemsPrice()}>sort by price</button>
      <button onClick={() => sortItemsDate()}>sort by Date</button>
      <button onClick={() => showAllProd()}>Show all product</button>
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

      <br></br>
      <input
        type="text"
        value={prodName}
        onChange={(mes) => setProdName(mes.target.value)}
        placeholder="What product you looking for?  "
      />
      <button onClick={() => filterItemsName(filter)}>filter the list</button>
      <br></br>
      <input
        type="number"
        value={minPrice}
        onChange={(mes) => setMinPrice(Number(mes.target.value) || 0)}
        placeholder="set min price to filter "
      />
      <input
        type="number"
        value={maxPrice}
        onChange={(mes) => setMaxPrice(Number(mes.target.value) || Infinity)}
        placeholder="set max price to filter "
      />
      <button onClick={() => filterItemsPrice(minPrice, maxPrice)}>
        filter the list
      </button>
      <br></br>
      <input
        type="text"
        value={date}
        onChange={(mes) => setDate(mes.target.value)}
        placeholder="chose date to filter "
      />

      <button onClick={() => filterItemsDate(date)}>filter the list</button>

      <ul>
        <ul>
          {items.map((data) => (
            <li>
              {data["Product_Name"]}, {data["upload_date"]}, {data["price"]}
            </li>
          ))}
        </ul>
      </ul>
    </>
  );
};

export default APPHome;
