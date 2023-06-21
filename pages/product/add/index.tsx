import Button from "@/components/Tools/Button";
import Container from "@/components/Tools/Container";
import Header from "@/components/Tools/Header";
import Input from "@/components/Tools/Input";
import Textarea from "@/components/Tools/Textarea";
import useAddProduct from "@/hooks/products/useAddProduct";
import { GenericProduct } from "@/types/globalTypes";
import { useState } from "react";
import styled from "styled-components";

const AddProduct = () => {
  // Api Hooks
  const { addProductMutate } = useAddProduct();

  // States
  const [formData, setFormData] = useState<GenericProduct>({
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
    addProductMutate(formData);
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <h1>Add Product Page</h1>
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
            <Textarea
              name={"description"}
              id={"productDescription"}
              className={"textareaBox"}
              labelName={"Description"}
              setIsValue={setFormData}
            />
            <Button
              buttonName={"Add Product"}
              width={"200px"}
              align={"left"}
              className={"sendButton"}
              onClick={submitHandler}
            />
          </Form>
        </AddProductBox>
      </Container>
    </Wrapper>
  );
};

export default AddProduct;

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

const Form = styled.div`
  .inputBox,
  .textareaBox {
    width: calc(100% / 4);
  }

  .textareaBox .textarea {
    height: 200px;
  }
`;
