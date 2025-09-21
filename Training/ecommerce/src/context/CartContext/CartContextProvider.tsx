import { type FC, type JSX, type ReactNode, useState } from "react";
import { CartContext, type CartProduct } from "./cartContext";

export interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({
  children,
}): JSX.Element => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [amounts, setAmounts] = useState<Record<number, number>>({});

  const updateAmount = (productId: number, amount: number) => {
    setCartItems((prevProducts) => {
      const existInCart = prevProducts.find(
        (productItem) => productItem.productId === productId
      );

      if (existInCart) {
        return prevProducts.map((productItem) =>
          productItem.productId === productId
            ? { ...productItem, amount: amount }
            : productItem
        );
      } else {
        const newProductInCart: CartProduct = {
          productId: productId,
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

  const handleAmountChange = (productId: number, value: number) => {
    setAmounts((prev) => ({ ...prev, [productId]: value }));
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
        amounts,
        handleAmountChange,
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
