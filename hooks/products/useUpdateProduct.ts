import { products } from "@/services/requests";
import { useMutation } from "react-query";

const useUpdateProduct = () => {
  const {
    mutate: updateProductMutate,
    data: updateProductData,
    isLoading: updateProductIsLoading,
  } = useMutation(["UPDATEPRODUCT"], products.updateProduct, {
    onSuccess(data, variables, context) {
      console.log(data);
    },
  });

  return {
    updateProductMutate,
    updateProductData,
    updateProductIsLoading,
  };
};

export default useUpdateProduct;
