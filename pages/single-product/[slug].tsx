import { useProduct } from "@/hooks/products/useProduct";
import styled from "styled-components";
import { useRouter } from "next/router";

const SingleProduct = () => {
  // Router
  const router = useRouter();
  const { slug } = router.query;

  // API Hooks
  const { productData, productIsLoading } = useProduct(slug);

  return (
    <Wrapper>
      {!productIsLoading ? (
        <>
          {" "}
          <SingleProductBox>{productData.id}</SingleProductBox>
          <SingleProductBox>{productData.title}</SingleProductBox>
          <SingleProductBox>{productData.description}</SingleProductBox>
          <SingleProductBox>{productData.price}</SingleProductBox>
        </>
      ) : (
        <div>Loading</div>
      )}
    </Wrapper>
  );
};

export default SingleProduct;

const Wrapper = styled.div``;

const SingleProductBox = styled.div``;
