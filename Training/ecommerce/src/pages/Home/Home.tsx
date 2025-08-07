import { useEffect, useState } from "react";
import { data } from "../../components/mockDataIphone.ts";
import style from "./Home.module.scss";
import type { Product } from "../../utils/types/products.ts";
import Button from "../../components/Button/Button.tsx";
import Products from "../../components/Product.tsx";
import Input from "../../components/Input/Input.tsx";

const APPHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prodName, setProdName] = useState("");
  const [items, setItems] = useState<Product[]>(data);
  const [minPrice, setMinPrice] = useState(-Infinity);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setItems(data);
  }, []);

  const filterItemsCatgory = (filter: string) => {
    if (filter.trim() === "") {
      setItems(data);
      return;
    }
    const filterList = items.filter((items: Product) =>
      items.category.includes(filter)
    );
    setItems(filterList);
  };

  const filterItemsName = (prodName: string) => {
    if (prodName.trim() === "") {
      setItems(data);
      return;
    }
    const filterList = items.filter((item: Product) =>
      item.name.includes(prodName)
    );
    setItems(filterList);
  };

  const filterItemsPrice = (minPrice: number, maxPrice: number) => {
    if (minPrice > maxPrice) {
      alert("min price Have to be <= then max price");
      return;
    }
    if (minPrice < 0 || maxPrice < 0) {
      alert("min and max price need to be positive");
      return;
    }
    const filterPrice = items.filter(
      (item: Product) => item.price >= minPrice && item.price <= maxPrice
    );
    setItems(filterPrice);
  };

  const filterItemsDate = (date: string) => {
    if (date.trim() === "") {
      setItems(data);
      return;
    }
    const filterDate = items.filter((item: Product) =>
      item.uploadDate.includes(date)
    );
    setItems(filterDate);
  };

  const showAllProd = () => {
    setItems(data);
  };

  const sortItemsPrice = () => {
    const sorted = [...items].sort(
      (a: Product, b: Product) => a.price - b.price
    );
    setItems(sorted);
  };

  const sortByDate = (a: Product, b: Product): number => {
    const dateA = new Date(a.uploadDate);
    const dateB = new Date(b.uploadDate);
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  };
  const sortItemsDate = () => {
    const ans = [...items].sort(sortByDate);
    setItems(ans);
  };

  return (
    <>
      <Products items={items}>
        <br></br>
      </Products>
      <Button onClick={() => sortItemsPrice()}>sort by price</Button>
      <Button onClick={() => sortItemsDate()}>sort by Date</Button>
      <Button onClick={() => showAllProd()}>Show all product</Button>

      <br></br>
      <Input
        type="text"
        value={searchTerm}
        onChange={(mes) => setSearchTerm(mes.target.value)}
        placeholder="Enter category for search"
      />
      <Button onClick={() => filterItemsCatgory(searchTerm)}>
        filter the list
      </Button>
      <br></br>
      <Input
        type="text"
        value={prodName}
        onChange={(mes) => setProdName(mes.target.value)}
        placeholder="Enter the product for search"
      />
      <Button onClick={() => filterItemsName(prodName)}>filter the list</Button>
      <br></br>
      <Input
        type="number"
        value={minPrice}
        onChange={(mes) => setMinPrice(+mes.target.value)}
        placeholder="set min price to filter"
      />
      {"  "}
      <Input
        type="number"
        value={maxPrice}
        onChange={(mes) => setMaxPrice(+mes.target.value || Infinity)}
        placeholder="set max price to filter"
      />
      <Button onClick={() => filterItemsPrice(minPrice, maxPrice)}>
        filter the list
      </Button>
      <br></br>
      <Input
        type="date"
        value={date}
        onChange={(mes) => setDate(mes.target.value)}
        placeholder=""
      />

      <Button onClick={() => filterItemsDate(date)}>filter the list</Button>
    </>
  );
};

export default APPHome;
