import { useProductControllerFindProduct } from "../../api/generated/generated.ts";
import Product from "../../components/Product/Product.tsx";
import { useParams } from "react-router-dom";
import PageNotFound from "../NotFound/notFound.tsx";
import { useCartContext } from "../../context/CartContext/cartContext.tsx";
import Button from "../../components/Button/Button.tsx";
import Input from "../../components/Input/Input.tsx";
import style from "./product.module.scss";
import { useMemo } from "react";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart, removeFromCart, changeAmount } =
    useCartContext();

  const { data: product, isLoading } = useProductControllerFindProduct(+id!);
  const cartProduct = useMemo(
    () => (id ? cartItems.find((item) => item.productId === +id): undefined),
    [cartItems, id]
  );

  if (isLoading) return <p>Loading...</p>;

  if (!product || id === undefined) return <PageNotFound />;

  return (
    <>
      <h1>Product Page</h1>
      <div className={style.productLi}>
        <Product item={product} />
      </div>
      <Input
        type="number"
        value={cartProduct?.amount ?? 0}
        onChange={(e) => changeAmount(product.id, +e.target.value)}
        placeholder="Amount"
      />


      <Button onClick={() => removeFromCart(product.id)}>
        remove from Cart
      </Button>

      {cartItems.some((item) => item.productId === product.id) ? (
        <>
          <p className={style.inCart}> Product already in cart</p>
          <button disabled>Add to Cart</button>
        </>
      ) : (
        <>
          <p className={style.notInCart}> Product not in the cart </p>
          <Button onClick={() => addToCart(product.id)}>Add to Cart</Button>
        </>
      )}
    </>
  );
};

export default ProductPage;
