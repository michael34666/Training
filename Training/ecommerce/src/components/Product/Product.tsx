import { type FC, type JSX } from "react";
import { Link } from "react-router-dom";
import type { IProduct } from "../../api/generated/model/iProduct.ts";
import style from "./Product.module.scss";
import { useCartContext } from "../../context/CartContext/cartContext.tsx";

export interface ProductProps {
  item: IProduct;
}

const Product: FC<ProductProps> = ({ item }): JSX.Element => {
  const { cartItems } = useCartContext();
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
      <p className={style.productDescription}>
        Description:
        <br /> {item.productDescription}
      </p>
      <p>Price: {item.price}$</p>
      {
        <p>
          {" "}
          Quantity:{" "}
          {cartItems.find((cart) => cart.productId == item.id)?.amount ?? 0}
        </p>
      }

      <p>
        {(item.categories ?? [])
          .map((category) => category.categoryName)
          .join(", ")}
      </p>
    </div>
  );
};

export default Product;
