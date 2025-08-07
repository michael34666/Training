import { data } from "../../components/mockDataIphone.ts";
import Products from "../../components/Products.tsx";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <h1>Product Page</h1>
      {
        <Products items={[data.find((item) => item.id === +(id ?? 1))!]}>
          <br />
        </Products>
      }
      :
    </>
  );
};

export default ProductPage;
