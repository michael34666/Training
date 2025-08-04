import { useEffect, useState } from "react";
import { data } from "./mockDataIphone";
import { useCart } from "./CartContext";

const ProductPage = () => {
  const [items, setItems] = useState(data);
  const { addToCart, removeAmount } = useCart();
  const [amountToADD, setamountToADD] = useState({});
  const [amountToRemove, setAmountToRemove] = useState({});

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <>
      <h1>Product Page</h1>
      <ul className="Ul">
        {items.map((item: any) => (
          <li key={item["id"]} className="Li">
            <h2>{item["Product_Name"]}</h2>
            <img
              src={item["image_url"]}
              alt={item["Product_Name"]}
              width={200}
            />
            <p>
              Date:<br></br> {item["upload_date"]}
            </p>
            <p>
              Description:<br></br> {item["description"]}
            </p>
            <p>Price: {item["price"]}$ </p>
            <p>Category: {item["category"]}</p>
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
            <br></br>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductPage;
