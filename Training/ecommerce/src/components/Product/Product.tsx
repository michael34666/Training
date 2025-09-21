import { type FC, type JSX } from "react";
import { Link } from "react-router-dom";
import type { IProduct } from "../../api/generated/model/iProduct.ts";

export interface ProductProps {
  item: IProduct;
  amount?: number;
}

const Product: FC<ProductProps> = ({ item, amount }): JSX.Element => {
  return (
    <div>
      <Link to={`/products/${item.id}`}>
        <h2>{item.productName}</h2>
      </Link>
      <img
        src={item.imageUrl}
        alt={item.productName}
        draggable={false}
        width={200}
        height={200}
      />
      <p>
        Date:
        <br /> {item.uploadDate}
      </p>
      <p>
        Description:
        <br /> {item.productDescription}
      </p>
      <p>Price: {item.price}$</p>
      {amount !== undefined && <p> Quantity: {amount}</p>}

      <p>
        {(item.categories ?? [])
          .map((category) => category.categoryName)
          .join(", ")}
      </p>
    </div>
  );
};

export default Product;
