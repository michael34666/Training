/*
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

import { useCart } from "./CartContext";
import { data } from "./MOCK_DATA_IPHONE";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const totalPriceCart = () => {
    return cartItems.reduce(
      (total: number, item: any) => total + item["price"] * item["quantity"],
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

      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item: any) => (
            <div key={item["id"]} className="Li">
              <img src={item["imageUrl"]} alt={item["Product_Name"]} />
              <h3>{item["Product_Name"]}</h3>
              <p>Price: $ {item["price"]}</p>
              <p>Quantity: {item["quantity"]}</p>
              <button onClick={() => removeFromCart(item["id"])}>
                {" "}
                Remove items
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div>
        <h2>Total: ${totalPriceCart()}</h2>
      </div>

      <div>
        {data.map((product: any) => (
          <button key={product["id"]} onClick={() => addToCart(product)}>
            Add {product["Product_Name"]} to Cart{" "}
          </button>
        ))}
      </div>

      <button onClick={() => submitOrder()}> Submit Order </button>
    </div>
  );
};

export default Cart;
