import { products } from "@/services/requests";
import { useMutation } from "react-query";

const useAddProduct = () => {
  const {
    mutate: addProductMutate,
    data: addProductData,
    isLoading: addProductIsLoading,
  } = useMutation("ADDPRODUCT", products.addProduct, {
    onSuccess(data, variables, context) {
      console.log(data);
    },
  });

  return {
    addProductMutate,
    addProductData,
    addProductIsLoading,
  };
};

export default useAddProduct;
