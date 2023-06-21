import { products } from "@/services/requests";
import { useQuery } from "react-query";

const useProducts = (params?: any, initialData?: any) => {
  const { data: productsData, isLoading: productsIsLoading } = useQuery(
    ["PRODUCTS", params ? params : ""],
    products.getProducts,
    {
      initialData,
    }
  );

  return {
    productsData,
    productsIsLoading,
  };
};

export { useProducts };
