import { products } from "@/services/requests";
import { useQuery } from "react-query";

const useProduct = (productSlug: string | string[] | undefined) => {
  const { data: productData, isLoading: productIsLoading } = useQuery(
    ["PRODUCT", productSlug],
    products.getProduct
  );

  return {
    productData,
    productIsLoading,
  };
};

export { useProduct };
