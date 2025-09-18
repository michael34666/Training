import { useProductControllerFindProduct } from "../../api/generated/generated.ts";
import Product from "../../components/Products/Products.tsx";
import { useParams } from "react-router-dom";
import PageNotFound from "../NotFound/notFound.tsx";
import { useCartContext } from "../../context/CartContext/cartContext.tsx";
import Button from "../../components/Button/Button.tsx";
import { useState } from "react";
import Input from "../../components/Input/Input.tsx";
import style from "./product.module.scss";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart, removeFromCart, changeAmount } =
    useCartContext();
  const [amounts, setAmounts] = useState<Record<number, number>>({});
  const handleAmountChange = (productId: number, value: number) => {
    setAmounts((prev) => ({ ...prev, [productId]: value }));
  };
  if (id === undefined) {
    return <PageNotFound />;
  }
  const numberId = +id;
  const { data: product, isLoading } =
    useProductControllerFindProduct(numberId);

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <PageNotFound />;

  return (
    <>
      <h1>Product Page</h1>
      <div className={style.ProductLi}>
        <Product item={product} />
      </div>
      <Input
        type="number"
        value={amounts[product.id]}
        onChange={(e) => handleAmountChange(product.id, +e.target.value)}
        placeholder="Amount"
      />

      <Button
        onClick={() =>
          changeAmount(
            product.id,
            amounts[product.id] ? amounts[product.id] : 0
          )
        }
      >
        Update amount
      </Button>
      <br></br>
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      <Button onClick={() => removeFromCart(product.id)}>
        remove from Cart
      </Button>

      {cartItems.some((item) => item.productId === product.id) ? (
        <p className={style.inCart}> Product already in cart</p>
      ) : (
        <p className={style.notInCart}> Product not in the cart </p>
      )}
    </>
  );
};

export default ProductPage;
