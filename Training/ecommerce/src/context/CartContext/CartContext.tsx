import { createContext, useContext } from "react";
import type { Product } from "../../utils/types/products";

export interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product, amount?: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  removeAmount: (itemToRemove: Product, amount: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = (): CartContextType => {
  const cartContext = useContext(CartContext);

  if (cartContext === null) {
    throw Error("You must useCartContent witin the CartContextProvider");
  }

  return cartContext;
};
