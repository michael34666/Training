import { createContext, useContext } from "react";

export interface CartProduct {
  productId: number;
  amount: number;
}

export interface CartContextType {
  cartItems: CartProduct[];
  addToCart: (productId: number, amount?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  changeAmount: (productId: number, amount: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = (): CartContextType => {
  const cartContext = useContext(CartContext);

  if (cartContext === null) {
    throw Error("You must useCartContext within the CartProvider");
  }

  return cartContext;
};
