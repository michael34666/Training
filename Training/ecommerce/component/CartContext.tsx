import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product: any, amount: number = 1) => {
    setCartItems((prevItems: any) => {
      const existItem = prevItems.find(
        (item: any) => item["id"] === product["id"]
      );

      if (existItem) {
        return prevItems.map((item: any) =>
          item["id"] === product["id"]
            ? { ...item, quantity: item["quantity"] + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
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

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
