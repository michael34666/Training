/* import { useState } from "react";

interface products {
  name: string;
  date: string;
  Description: string;
  price: number;
  sellerName: string;
  imageUrl: string;
  category: string;
  addInfo: string;
}

interface category {
  name: string;
}
interface order {
  orderDate: string;
  listOfProd: products;
} */

const Cart = () => {
  const addToCart = () => {};

  const removeFromCart = () => {};

  return (
    <>
      <h1>The Cart page</h1>
      <button
        className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        onClick={() => {
          addToCart();
        }}
      >
        +
      </button>

      <button
        className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        onClick={() => {
          removeFromCart();
        }}
      >
        -
      </button>
    </>
  );
};

export default Cart;
