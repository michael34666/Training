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
}

const showImg = () => {};
*/

import { useEffect, useState } from "react";
import { data } from "./MOCK_DATA_IPHONE";
import { useCart } from "./CartContext";

const ProductPage = () => {
  const [items, setItems] = useState(data);
  const { addToCart } = useCart();
  const [amountToADD, setamountToADD] = useState(-Infinity);
  //const[amountToRemove,setAmountToRemove]=useState(-Infinity);

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
            <p>Date:<br></br> {item["upload_date"]}</p>
            <p>Description:<br></br> {item["description"]}</p>
            <p>Price: {item["price"]}$ </p>
            <p>Category: {item["category"]}</p>
            <br></br>

            <input
              type="number"
              value={amountToADD}
              onChange={(mes) =>
                setamountToADD(Number(mes.target.value) || Infinity)
              }
              placeholder="amount you want to add "
            />
            <button onClick={() => addToCart(item, amountToADD)}>
              {" "}
              Add to Cart
            </button>
            <br></br>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductPage;

/*<input
              type="number"
              value={amountToRemove}
              onChange={(mes) => setAmountToRemove(Number(mes.target.value) || Infinity)}
              placeholder="amount to remove "
              />
            <button onClick={() => removeAmount(item,amountToRemove)}> Remove from Cart</button>
            <br></br>*/
