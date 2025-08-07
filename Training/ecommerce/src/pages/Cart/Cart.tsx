import { useMemo, useState } from "react";
import { useCartContext } from "../../context/CartContext/CartContext.tsx";
import { data } from "../../components/mockDataIphone.ts";
import style from "./Cart.module.scss";
import type { Product } from "../../utils/types/products.ts";
import Button from "../../components/Button/Button.tsx";
import ProductPage from "../Product/ProductPage.tsx";
import Products from "../../components/Product.tsx";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, removeAmount, clearCart } =
    useCartContext();
  const [amountToAdd, setAmountToAdd] = useState<{ [key: number]: number }>({});
  const [amountToRemove, setAmountToRemove] = useState<{
    [key: number]: number;
  }>({});

  const totalPriceCart = () => {
    return cartItems.reduce(
      (total: number, item: Product) => total + item.price * item.quantity,
      0
    );
  };

  const calcTotalPrice = useMemo(() => totalPriceCart(), [cartItems]);
  const countItems = () => {
    return cartItems.reduce(
      (total: number, item: Product) => total + item.quantity,
      0
    );
  };

  const clacCountItems = useMemo(() => countItems(), [cartItems]);

  const submitOrder = () => {
    alert("Your order submitted");
    clearCart();
  };

  return (
    <div>
      <h1>Cart Page</h1>

      <div className={style.cart}>
        {cartItems.length > 0 ? (
          <Products items={cartItems}>
            <p></p>
          </Products>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div>
        <h2>Total: {calcTotalPrice}$</h2>
      </div>

      <div>
        {data.map((item: Product) => (
          <Button key={item.id} onClick={() => addToCart(item)}>
            Add {item.name} to Cart
          </Button>
        ))}
      </div>
      <div></div>

      <Button onClick={() => submitOrder()}> Submit Order </Button>
      <h2>have {clacCountItems} product in card</h2>
    </div>
  );
};

export default Cart;
