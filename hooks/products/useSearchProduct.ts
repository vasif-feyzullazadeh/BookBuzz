import { products } from "@/services/requests";
import { useQuery } from "react-query";

const useProductSearch = (q: string | null) => {
  const { data: searchData, isLoading: searchIsLoading } = useQuery(
    ["PRODUCTSEARCH", !!q ? q : ""],
    products.searchProducts
  );

  return {
    searchData,
    searchIsLoading,
  };
};

export default useProductSearch;
