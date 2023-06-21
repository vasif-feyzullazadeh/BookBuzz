import { products } from "@/services/requests";
import { useMutation } from "react-query";

const useProductSearchMutation = () => {
  const {
    mutate: searchMutate,
    data: searchData,
    isLoading: searchIsLoading,
  } = useMutation((params: { q: string | null }) =>
    products.searchProductsMutation(params)
  );

  return {
    searchData,
    searchIsLoading,
    searchMutate,
  };
};

export default useProductSearchMutation;
