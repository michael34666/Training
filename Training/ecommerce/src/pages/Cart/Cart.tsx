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
  const { cartItems, removeFromCart, clearCart, changeAmount } =
    useCartContext();

  const { data: products } = useProductControllerGetAllProduct();
  const { mutateAsync: mutationFn } = useOrderControllerAddNew();

  const uploadDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const productOrderDTO = useMemo(() => {
    return cartItems.map((item) => ({
      id: item.productId,
      amount: item.amount,
    }));
  }, [cartItems]);

  const orderDTO: CreateOrderDTO = useMemo(() => {
    return {
      uploadDate,
      products: productOrderDTO,
    };
  }, [uploadDate, productOrderDTO]);

  const addOrder = async () => {
    const newOrder = await mutationFn({ data: orderDTO });
    alert("order number is " + newOrder.id);
    return newOrder;
  };

  const cartItemsWithData = useMemo(() => {
    if (!products) return [];
    return cartItems.map((order: CartProduct) => {
      const product = products.find((p: IProduct) => p.id === order.productId);
      return { ...order, product };
    });
  }, [cartItems, products]);

  const totalPrice = useMemo(() => {
    return cartItemsWithData.reduce((total, item) => {
      if (!item.product) return total;
      return total + item.product.price * item.amount;
    }, 0);
  }, [cartItemsWithData]);

  const totalCount = useMemo(() => {
    return cartItemsWithData.reduce((total, item) => total + item.amount, 0);
  }, [cartItemsWithData]);

  const submitOrder = () => {
    if (totalCount !== 0) {
      if (addOrder() !== null) {
        clearCart();
        alert("Your order submitted");
      }
    } else {
      alert("Cart is empty");
    }
  };

  return (
    <>
      <h1>Cart Page</h1>
      <div className={style.cart}>
        {cartItemsWithData.length > 0 ? (
          <>
            {cartItemsWithData.map((item) =>
              item.product && item.amount > 0 ? (
                <div className={style.cartItem}>
                  <div key={item.productId}>
                    <Product item={item.product} />
                  </div>
                  <Input
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      changeAmount(item.productId, +e.target.value)
                    }
                    placeholder="Amount"
                  />

                  <Button onClick={() => removeFromCart(item.productId)}>
                    Remove
                  </Button>
                </div>
              ) : null
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
