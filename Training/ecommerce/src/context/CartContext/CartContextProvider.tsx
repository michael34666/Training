import { type FC, type JSX, type ReactNode, useState } from "react";
import { CartContext, type CartProduct } from "./cartContext";

export interface CartProviderProps {
  children: ReactNode;
}
const BIG_AMOUNT = 10000;

export const CartProvider: FC<CartProviderProps> = ({
  children,
}): JSX.Element => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const updateAmount = (productId: number, amount: number) => {
    setCartItems((prevProducts) => {
      const index = prevProducts.findIndex(
        (productItem) => productItem.productId === productId
      );
      if (amount > BIG_AMOUNT) {
        alert("Enter not that big amount of products");
        return prevProducts;
      }
      if (index !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          amount,
        };
        return updatedProducts;
      } else {
        const newProductInCart: CartProduct = {
          productId,
          amount,
        };
        return [...prevProducts, newProductInCart];
      }
    });
  };

  const addToCart = (productId: number, amount: number = 1) => {
    if (amount <= 0) {
      alert("Enter a valid amount of product to add");
      return;
    }

    updateAmount(productId, amount);
  };



  const removeFromCart = (productId: number) => {
    const existProduct = cartItems.find(
      (prevProducts) => prevProducts.productId === productId
    );
    if (!existProduct) {
      alert("Product not in the cart");
    }
    setCartItems((prevProductsOrders) =>
      prevProductsOrders.filter(
        (productsOrders) => productsOrders.productId !== productId
      )
    );
  };

  const changeAmount = (productId: number, amount: number) => {
    if (amount <= 0) {
      alert("Enter a valid amount of product to add");
      return;
    }

    updateAmount(productId, amount);
    
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
