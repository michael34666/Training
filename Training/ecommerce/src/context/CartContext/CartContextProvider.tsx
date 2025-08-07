import { type FC, type JSX, type ReactNode, useState } from "react";
import type { Product } from "../../utils/types/products";
import { CartContext } from "./CartContext";

export interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({
  children,
}): JSX.Element => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product, amount: number = 1) => {
    if (amount < 0) {
      alert("Enter a valid amount of product to add");
      return;
    }
    setCartItems((prevItems: Product[]) => {
      const existItem = prevItems.find(
        (item: Product) => item.id === product.id
      );

      if (existItem) {
        return prevItems.map((item: Product) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: amount }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    if (itemId) {
      setCartItems((prevItems) =>
        prevItems.filter((item: Product) => item.id !== itemId)
      );
    }
  };

  const removeAmount = (itemToRemove: Product, amount: number) => {
    if (amount < 0) {
      alert("Please enter a positive number to remove.");
      return;
    }

    setCartItems((prevItems: Product[]) => {
      const existItem = prevItems.find(
        (item: Product) => itemToRemove.id === item.id
      );

      if (!existItem) {
        alert("Item not found in the cart.");
        return prevItems;
      }

      if (amount > existItem.quantity) {
        alert("Please remove less than the available quantity.");
        return prevItems;
      }

      return prevItems.map((items: Product) =>
        items.id === itemToRemove.id
          ? { ...items, quantity: items.quantity - amount }
          : items
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
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
