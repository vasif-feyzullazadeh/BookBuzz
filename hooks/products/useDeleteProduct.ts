import { products } from "@/services/requests";
import { useMutation } from "react-query";

const useDeleteProduct = () => {
  const {
    mutate: deleteProductMutate,
    data: deleteProductData,
    isLoading: deleteProductIsLoading,
  } = useMutation(["DELETEPRODUCT"], products.deleteProduct, {
    onSuccess(data, variables, context) {
      console.log(data);
    },
  });

  return {
    deleteProductMutate,
    deleteProductData,
    deleteProductIsLoading,
  };
};

export default useDeleteProduct;
