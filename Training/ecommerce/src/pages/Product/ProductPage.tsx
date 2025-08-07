import { useState } from "react";
import { data } from "../../components/mockDataIphone.ts";
import type { Product } from "../../utils/types/products.ts";
import Products from "../../components/Product.tsx";
import Button from "../../components/Button/Button.tsx";
import Input from "../../components/Input/Input.tsx";

const ProductPage = () => {
  const [id, setId] = useState<number | string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>("");

  const searchProductId = (): void => {
    if (id === "") {
      setError("Please enter product ID.");
      setProduct(null);
    } else {
      const selectedProduct = data.find((item) => item.id === id);
      if (selectedProduct) {
        setProduct(selectedProduct);
        setError("");
      } else {
        setError("Product not found.");
        setProduct(null);
      }
    }
  };

  return (
    <>
      <h1>Product Page</h1>

      <div>
        <Input
          type="number"
          value={id === "" ? "" : id}
          onChange={(e) => setId(e.target.value === "" ? "" : +e.target.value)}
          placeholder="Enter product ID"
        />

        <Button onClick={() => searchProductId()}>Show all product</Button>
      </div>
      
      <p>{error}</p>

      {product && (
        <Products items={[product]}>
          <br />
        </Products>
      )}
    </>
  );
};

export default ProductPage;
