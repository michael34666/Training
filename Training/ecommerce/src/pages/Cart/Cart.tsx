import { useMemo, useState } from "react";
import { useCartContext } from "../../context/CartContext/cartContext.tsx";
import style from "../Cart/cart.module.scss";
import type { IProduct } from "../../api/generated/model/iProduct.ts";
import Button from "../../components/Button/Button.tsx";
import Product from "../../components/Products/Products.tsx";
import { useProductControllerGetAllProduct } from "../../api/generated/generated.ts";
import type { IProductOrder } from "../../api/generated/model/iProductOrder.ts";
import Input from "../../components/Input/Input.tsx";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, changeAmount } =
    useCartContext();
  const { data: products } = useProductControllerGetAllProduct();

  const [amounts, setAmounts] = useState<Record<number, number>>({});

  const orderItems = useMemo(() => {
    if (!products) return [];
    return cartItems.map((order: IProductOrder) => {
      const product = products.find((p: IProduct) => p.id === order.productId);
      return { ...order, product };
    });
  }, [cartItems, products]);

  const totalPrice = useMemo(() => {
    return orderItems.reduce((total, item) => {
      if (!item.product) return total;
      return total + item.product.price * item.amount;
    }, 0);
  }, [orderItems]);

  const totalCount = useMemo(() => {
    return orderItems.reduce((total, item) => total + item.amount, 0);
  }, [orderItems]);

  const submitOrder = () => {
    if (totalCount != 0) {
      alert("Your order submitted");
      clearCart();
    } else {
      alert("Cart is empty");
    }
  };

  const handleAmountChange = (productId: number, value: number) => {
    setAmounts((prev) => ({ ...prev, [productId]: value }));
  };

  return (
    <>
      <h1>Cart Page</h1>

      <div className={style.cart}>
        {orderItems.length > 0 ? (
          <>
            {orderItems.map((item) =>
              item.product && item.amount > 0 ? (
                <div className={style.cartItem}>
                  <div key={item.productId}>
                    <Product item={item.product} amount={item.amount} />
                  </div>
                  <Input
                    type="number"
                    value={amounts[item.productId]}
                    onChange={(e) =>
                      handleAmountChange(item.productId, +e.target.value)
                    }
                    placeholder="Amount"
                  />

                  <Button
                    onClick={() =>
                      changeAmount(
                        item.productId,
                        amounts[item.productId] ? amounts[item.productId] : 0
                      )
                    }
                  >
                    Update amount
                  </Button>

                  <Button onClick={() => removeFromCart(item.productId)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <p></p>
              )
            )}
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className={style.summeryCart}>
        <h2>You have {totalCount ? totalCount : 0} products in cart</h2>

        <h2>Total: {totalPrice ? totalPrice : 0}$</h2>
        <Button onClick={submitOrder}>Submit Order</Button>
      </div>
    </>
  );
};

export default Cart;
