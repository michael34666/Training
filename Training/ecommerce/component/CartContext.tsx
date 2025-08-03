import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }: { children: any }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product: any, amount: number = 1) => {
    if (amount < 0) {
      alert("Enter a valid amount of product to add");
      return;
    }
    setCartItems((prevItems: any) => {
      const existItem = prevItems.find(
        (item: any) => item["id"] === product["id"]
      );

      if (existItem) {
        alert("The product exist");
        return prevItems.map((item: any) =>
          item["id"] === product["id"]
            ? { ...item, quantity: item["quantity"] + amount }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: amount }];
      }
    });
  };

  const removeFromCart = (itemId: any) => {
    if (itemId) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item["id"] !== itemId)
      );
    } else {
      setCartItems([]);
    }
  };

  const changeAmount = (product: any, amount: number) => {
    if (amount > 0) {
      setCartItems((prevItems: any) => {
        const existItem = prevItems.find(
          (item: any) => item["id"] === product["id"]
        );

        if (existItem) {
          return prevItems.map((item: any) =>
            item["id"] === product["id"]
              ? { ...item, quantity: item["quantity"] + amount }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: amount }];
        }
      });
    } else if (Math.abs(amount) <= product["quantity"]) {
      setCartItems((prevItems: any) => {
        const existItem = prevItems.find(
          (item: any) => item["id"] === product["id"]
        );

        if (existItem) {
          return prevItems.map((item: any) =>
            item["id"] === product["id"]
              ? { ...item, quantity: item["quantity"] + amount }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: amount }];
        }
      });
    } else {
      alert("Please provide correct amount");
    }
  };

  const removeAmount = (product: any, amount: number) => {
    if (amount < 0) {
      alert("Please enter a positive number to remove.");
      return;
    }

    setCartItems((prevItems: any) => {
      const existItem = prevItems.find(
        (item: any) => item["id"] === product["id"]
      );

      if (!existItem) {
        alert("Item not found in the cart.");
        return prevItems;
      }

      if (amount > existItem["quantity"]) {
        alert("Please remove less than the available quantity.");
        return prevItems;
      }

      return prevItems.map((item: any) =>
        item["id"] === product["id"]
          ? { ...item, quantity: item["quantity"] - amount }
          : item
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
        changeAmount,
        removeAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
