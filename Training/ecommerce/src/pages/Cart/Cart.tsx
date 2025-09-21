import { useMemo } from "react";
import {
  useCartContext,
  type CartProduct,
} from "../../context/CartContext/cartContext.tsx";
import style from "../Cart/cart.module.scss";
import type { IProduct } from "../../api/generated/model/iProduct.ts";
import Button from "../../components/Button/Button.tsx";
import Product from "../../components/Product/Product.tsx";
import {
  useOrderControllerAddNew,
  useProductControllerGetAllProduct,
} from "../../api/generated/generated.ts";
import Input from "../../components/Input/Input.tsx";
import type { CreateOrderDTO } from "../../api/generated/model/createOrderDTO.ts";

const Cart = () => {
  const {
    amounts,
    cartItems,
    handleAmountChange,
    removeFromCart,
    clearCart,
    changeAmount,
  } = useCartContext();
  const { data: products } = useProductControllerGetAllProduct();
  const { mutate: mutationFn } = useOrderControllerAddNew();

  const date = new Date();
  const uploadDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const poductOrderDTO = cartItems.map((item) => ({
    id: item.productId,
    amount: item.amount,
  }));

  const newOrder: CreateOrderDTO = { uploadDate, products: poductOrderDTO };

  const addOrder = () => {
    mutationFn({ data: newOrder });
    console.log(newOrder);
  };

  const orderItems = useMemo(() => {
    if (!products) return [];
    return cartItems.map((order: CartProduct) => {
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
    if (totalCount !== 0) {
      alert("Your order submitted");
      addOrder();
      clearCart();
    } else {
      alert("Cart is empty");
    }
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
