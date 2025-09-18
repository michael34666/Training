import { type FC, type JSX, type ReactNode, useState } from "react";
import { CartContext } from "./cartContext";
import type {
  IProductOrder,
  IProduct,
  IOrder,
} from "../../api/generated/model";

export interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({
  children,
}): JSX.Element => {
  const [cartItems, setCartItems] = useState<IProductOrder[]>([]);

  const addToCart = (product: IProduct, amount: number = 1) => {
    let count = 0;
    if (amount <= 0) {
      alert("Enter a valid amount of product to add");
      return;
    }

    setCartItems((prevOrders) => {
      const existOrder = prevOrders.find(
        (order) => order.productId === product.id
      );

      if (existOrder) {
        return prevOrders.map((order) =>
          order.productId === product.id
            ? { ...order, amount: order.amount + amount }
            : order
        );
      } else {
        const newOrder: IProductOrder = {
          id: count++,
          order: {} as IOrder,
          productId: product.id,
          amount,
        };
        return [...prevOrders, newOrder];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    const existProduct = cartItems.find(
      (order) => order.productId === productId
    );
    if (!existProduct) {
      alert("Product not in the cart");
    }
    setCartItems((prevOrders) =>
      prevOrders.filter((order) => order.productId !== productId)
    );
  };

  const removeAmount = (productId: number, amount: number = 1) => {
    if (amount <= 0) {
      alert("Please enter a positive number to remove.");
      return;
    }

    setCartItems((prevOrders) => {
      const existOrder = prevOrders.find(
        (order) => order.productId === productId
      );

      if (!existOrder) {
        alert("Item not found in the cart.");
        return prevOrders;
      }

      if (amount > existOrder.amount) {
        alert("Please remove less than or equal to the available quantity.");
        return prevOrders;
      }

      return prevOrders
        .map((order) =>
          order.productId === productId
            ? { ...order, amount: order.amount - amount }
            : order
        )
        .filter((order) => order.amount > 0);
    });
  };

  const changeAmount = (productId: number, amount: number) => {
    let count = 0;
    if (amount <= 0) {
      alert("Enter a valid amount of product to add");
      return;
    }
    setCartItems((prevOrders) => {
      const existOrder = prevOrders.find(
        (order) => order.productId === productId
      );

      if (existOrder) {
        return prevOrders.map((order) =>
          order.productId === productId ? { ...order, amount: amount } : order
        );
      } else {
        const newOrder: IProductOrder = {
          id: count++,
          order: {} as IOrder,
          productId: productId,
          amount,
        };
        return [...prevOrders, newOrder];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        changeAmount,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        removeAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
