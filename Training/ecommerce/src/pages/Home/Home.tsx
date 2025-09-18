import { useEffect, useState } from "react";
import type { IProduct } from "../../api/generated/model/iProduct.ts";
import style from "../Home/home.module.scss";
import Button from "../../components/Button/Button.tsx";
import Input from "../../components/Input/Input.tsx";
import Product from "../../components/Products/Products.tsx";
import { useProductControllerGetAllProduct } from "../../api/generated/generated.ts";
import { useCartContext } from "../../context/CartContext/cartContext.tsx";

const APPHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prodName, setProdName] = useState("");
  const [minPrice, setMinPrice] = useState(-Infinity);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [date, setDate] = useState<string>("");

  const { data: products, isLoading } = useProductControllerGetAllProduct();
  const { cartItems, addToCart } = useCartContext();
  const [items, setItems] = useState<IProduct[]>([]);

  useEffect(() => {
    if (products) {
      setItems(products);
    }
  }, [products]);

  const inputHelper = (str: string) => str.trim().toLowerCase();

  const filterItemsCategory = (filter: string) => {
    const normalizedFilter = inputHelper(filter);
    if (!normalizedFilter) {
      setItems(products ?? []);
      return;
    }
    const filtered = (products ?? []).filter((item) =>
      item.categories?.some((cat) =>
        inputHelper(cat.categoryName).includes(normalizedFilter)
      )
    );
    setItems(filtered);
  };

  const filterItemsName = (name: string) => {
    const normalizedName = inputHelper(name);
    if (!normalizedName) {
      setItems(products ?? []);
      return;
    }
    const filtered = (products ?? []).filter((item) =>
      inputHelper(item.productName).includes(normalizedName)
    );
    setItems(filtered);
  };

  const filterItemsPrice = (min: number, max: number) => {
    if (min < 0 || max < 0) {
      alert("Prices must be positive");
      return;
    }

    const filtered = (products ?? []).filter(
      (item) => item.price >= min && item.price <= max
    );
    setItems(filtered);
  };

  const filterItemsDate = (date: string) => {
    const normalizedDate = inputHelper(date);
    if (!normalizedDate) {
      setItems(products ?? []);
      return;
    }
    const filtered = (products ?? []).filter((item: IProduct) =>
      item.uploadDate.includes(normalizedDate)
    );
    setItems(filtered);
  };

  const sortItemsPrice = () => {
    const sorted = [...items].sort((a, b) => a.price - b.price);
    setItems(sorted);
  };

  const sortItemsDate = () => {
    const sorted = [...items].sort(
      (a, b) =>
        new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
    );
    setItems(sorted);
  };

  const showAllProd = () => setItems(products ?? []);

  if (isLoading) return <p>Loading products...</p>;

  return (
    <>
      <div>
        <ul className={style.HomeUl}>
          {items.map((item) => (
            <li key={item.id} className={style.HomeLi}>
              <Product item={item} />
              <Button onClick={() => addToCart(item)}>Add to Cart</Button>
              {cartItems.some((it) => it.productId === item.id) ? (
                <p className={style.inCart}> Product already in cart</p>
              ) : (
                <p className={style.notInCart}> Product not in the cart </p>
              )}
            </li>
          ))}
        </ul>
        <div>
          <div className={style.leftSidebar}>
            <h3>Search </h3>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                filterItemsCategory(e.target.value);
              }}
              placeholder="Enter category"
            />
            <br />
            <Input
              type="text"
              value={prodName}
              onChange={(e) => {
                setProdName(e.target.value);
                filterItemsName(e.target.value);
              }}
              placeholder="Enter product name"
            />
            <br />
            <Input
              type="number"
              value={Number.isFinite(minPrice) ? minPrice : ""}
              onChange={(e) => {
                const newMinPrice = +e.target.value;
                setMinPrice(newMinPrice);
                filterItemsPrice(newMinPrice, maxPrice);
              }}
              placeholder="Min price"
            />
            <Input
              type="number"
              value={Number.isFinite(maxPrice) ? maxPrice : ""}
              onChange={(e) => {
                const newMaxPrice = +e.target.value || Infinity;
                setMaxPrice(newMaxPrice);
                filterItemsPrice(minPrice, newMaxPrice);
              }}
              placeholder="Max price"
            />
            <br />
            <Input
              type="text"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                filterItemsDate(e.target.value);
              }}
              placeholder="by product upload Date"
            />
            <h3>sort </h3>
            <Button onClick={sortItemsPrice}>Sort by Price</Button>
            <Button onClick={sortItemsDate}>Sort by Date</Button>
            <h3>show all product </h3>
            <Button onClick={showAllProd}>Show All Products</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default APPHome;
