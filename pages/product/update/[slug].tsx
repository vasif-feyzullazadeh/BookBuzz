import Button from "@/components/Tools/Button";
import Container from "@/components/Tools/Container";
import Header from "@/components/Tools/Header";
import Input from "@/components/Tools/Input";
import Textarea from "@/components/Tools/Textarea";
import useUpdateProduct from "@/hooks/products/useUpdateProduct";
import { GenericProduct } from "@/types/globalTypes";
import { useState } from "react";
import styled from "styled-components";

const UpdateProduct = () => {
  // Api Hooks
  const { updateProductMutate } = useUpdateProduct();

  // States
  const [formData, setFormData] = useState<GenericProduct>({
    id: 1,
    title: "",
    description: "",
    price: "",
    discountPercentage: null,
    rating: null,
    stock: null,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  });

  const submitHandler = () => {
    updateProductMutate(formData);
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <h1>Update Product Page</h1>
        <AddProductBox>
          <Form>
            <Input
              type={"text"}
              id={"productTitle"}
              labelName={"Title"}
              name={"title"}
              setIsValue={setFormData}
              className={"inputBox"}
            />
            <Input
              type={"text"}
              id={"productBrand"}
              labelName={"Brand"}
              name={"brand"}
              setIsValue={setFormData}
              className={"inputBox"}
            />
            <Input
              type={"number"}
              id={"productdiscountPercentage"}
              labelName={"Discount Percentage"}
              name={"discountPercentage"}
              setIsValue={setFormData}
              className={"inputBox"}
            />
            <Textarea
              name={"description"}
              id={"productDescription"}
              className={"textareaBox"}
              labelName={"Description"}
              setIsValue={setFormData}
            />
            <Button
              buttonName={"Update"}
              width={"200px"}
              align={"left"}
              className={"sendButton"}
              onClick={submitHandler}
            />
          </Form>
          <Loading>
            <div className="classic-4"></div>
          </Loading>
        </AddProductBox>
      </Container>
    </Wrapper>
  );
};

export default UpdateProduct;

const Wrapper = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #333;
  }
`;

const AddProductBox = styled.div`
  margin-top: 30px;
`;

const Loading = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 130px;
  place-items: center;

  [class*="classic"]:before {
    content: "Loading...";
  }

  .classic-4 {
    font-weight: bold;
    font-family: monospace;
    font-size: 30px;
    clip-path: inset(0 3ch 0 0);
    animation: c4 1s steps(4) infinite;
  }
  @keyframes c4 {
    to {
      clip-path: inset(0 -1ch 0 0);
    }
  }
`;

const Form = styled.div`
  .inputBox,
  .textareaBox {
    width: calc(100% / 4);
  }

  .textareaBox .textarea {
    height: 200px;
  }
`;
