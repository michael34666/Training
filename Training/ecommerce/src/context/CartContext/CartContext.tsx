import { createContext, useContext } from "react";
import type { IProduct } from "../../api/generated/model/iProduct";
import type { IProductOrder } from "../../api/generated/model";

export interface CartContextType {
  cartItems: IProductOrder[];
  addToCart: (product: IProduct, amount?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  removeAmount: (productId: number, amount: number) => void;
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
