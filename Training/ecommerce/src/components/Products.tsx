import { useState, type FC, type JSX, type ReactNode } from "react";
import type { Product } from "../utils/types/products.ts";
import style from "../pages/Product/Product.module.scss";
import { useCartContext } from "../context/CartContext/CartContext.tsx";
import Button from "./Button/Button.tsx";
import { Link } from "react-router-dom";
export interface ProductProp {
  children: ReactNode;
  items: Product[];
}
const Products: FC<ProductProp> = ({ children, items }): JSX.Element => {
  const { addToCart, removeAmount, removeFromCart } = useCartContext();
  const [amountToADD, setamountToADD] = useState<{ [key: number]: number }>({});

  const [amountToRemove, setAmountToRemove] = useState<{
    [key: number]: number;
  }>({});
  return (
    <>
      {children}

      <ul className={style.ProductUl}>
        {items.map((item: Product) => (
          <li key={item.id} className={style.ProductLi}>
            <Link to={`/product/${item.id}`}>
              <h2>{item.name} </h2>
            </Link>
            <img
              src={item.imageUrl}
              alt={item.name}
              draggable={false}
              width={200}
            />
            <p>
              Date:<br></br> {item.uploadDate}
            </p>
            <p>
              Description:<br></br> {item.description}
            </p>

            <div>
              {item.quantity > 0 ? (
                <div>
                  {" "}
                  Quantity: {item.quantity}
                  <br></br>
                  Price: {item.price}${" "}
                </div>
              ) : (
                <br></br>
              )}
            </div>

            <p>Category: {item.category}</p>

            <Button onClick={() => addToCart(item)}>
              Add one product to Cart
            </Button>
            <Button onClick={() => removeFromCart(item.id)}>
              Remove the products from Cart
            </Button>
            <br></br>
            <input
              type="number"
              value={amountToADD[item.id]}
              onChange={(mes) =>
                setamountToADD({
                  ...amountToADD,
                  [item.id]: +mes.target.value,
                })
              }
              placeholder="amount you want to add"
            />

            <Button onClick={() => addToCart(item, amountToADD[item.id])}>
              Add Amount
            </Button>
            <br />
            <br></br>
            <input
              type="number"
              value={amountToRemove[item.id]}
              onChange={(mes) =>
                setAmountToRemove({
                  ...amountToRemove,
                  [item.id]: +mes.target.value,
                })
              }
              placeholder="amount to remove "
            />
            <Button onClick={() => removeAmount(item, amountToRemove[item.id])}>
              {" "}
              Remove from Cart
            </Button>
            <br></br>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
