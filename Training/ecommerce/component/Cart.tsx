import { useState } from "react";
import { useCart } from "./CartContext";
import { data } from "./mockDataIphone.ts";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [amountToADD, setamountToADD] = useState({});
  const [amountToRemove, setAmountToRemove] = useState({});

  const totalPriceCart = () => {
    return cartItems.reduce(
      (total: number, item: any) => total + item["price"] * item["quantity"],
      0
    );
  };

  const howManyItems = () => {
    return cartItems.reduce(
      (total: number, item: any) => total + item["quantity"],
      0
    );
  };

  const submitOrder = () => {
    alert("Your order submitted");
    removeFromCart();
  };

  return (
    <div>
      <h1>Cart Page</h1>

      <div className="cart">
        {cartItems.length > 0 ? (
          cartItems.map((item: any) => (
            <div key={item["id"]} className=" cartItem">
              <h3>{item["Product_Name"]}</h3>
              <p>Price: {item["price"]} $</p>
              <p>Quantity: {item["quantity"]}</p>
              <button onClick={() => removeFromCart(item["id"])}>
                {" "}
                Remove items
              </button>
              <br></br>

              <input
                type="number"
                value={amountToADD[item["id"]]}
                onChange={(mes) =>
                  setamountToADD({
                    ...amountToADD,
                    [item["id"]]: Number(mes.target.value),
                  })
                }
                placeholder="amount you want to add"
              />

              <button onClick={() => addToCart(item, amountToADD[item["id"]])}>
                Add Amount
              </button>

              <br />
              <br></br>

              <input
                type="number"
                value={setAmountToRemove[item["id"]]}
                onChange={(mes) =>
                  setamountToADD({
                    ...amountToRemove,
                    [item["id"]]: Number(mes.target.value),
                  })
                }
                placeholder="amount to remove "
              />
              <button
                onClick={() => removeAmount(item, amountToRemove[item["id"]])}
              >
                {" "}
                Remove from Cart
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div>
        <h2>Total: {totalPriceCart()}$</h2>
      </div>

      <div>
        {data.map((product: any) => (
          <button key={product["id"]} onClick={() => addToCart(product)}>
            Add {product["Product_Name"]} to Cart{" "}
          </button>
        ))}
      </div>
      <div></div>

      <button onClick={() => submitOrder()}> Submit Order </button>
      <h2>have {howManyItems()} product in card</h2>
    </div>
  );
};

export default Cart;
