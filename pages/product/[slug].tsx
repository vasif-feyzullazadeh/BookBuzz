import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Header from "@/components/Tools/Header";
import Footer from "@/components/Tools/Footer";
import Container from "@/components/Tools/Container";
import { GetServerSideProps } from "next";
import axios from "axios";
import { GenericProduct } from "@/types/globalTypes";
import Slider from "@/components/Tools/Slider";
import useDeleteProduct from "@/hooks/products/useDeleteProduct";

interface Props {
  singleProductData: GenericProduct;
}

const SingleProduct = ({ singleProductData }: Props) => {
  const {
    id,
    title,
    price,
    discountPercentage,
    category,
    brand,
    description,
    images,
    rating,
    stock,
  } = singleProductData;

  const { deleteProductMutate } = useDeleteProduct();
  return (
    <Wrapper>
      <Head>
        <title>Product Details</title>
        <meta name="description" content="Product Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <ProductDetailBox>
          <Link href={`/product/update/${id}`} className="updateProductButton">
            Update Product
          </Link>
          <Link
            href={`/product/${id}`}
            className="deleteProductButton"
            onClick={() => {
              deleteProductMutate(id);
            }}
          >
            Delete Product
          </Link>
          <BreadCrumb>
            <Link href={"/"}>Home</Link>
            <Link href={`/product/${id}`}>{title}</Link>
          </BreadCrumb>
          <Row>
            <Left>
              <Slider sliders={images} />
            </Left>
            <Right>
              <Title>{title}</Title>
              <Desc>{description}</Desc>
              <CostBox>
                <Price>${price}</Price>
                <DiscountPercentage>
                  {discountPercentage} % OFF
                </DiscountPercentage>
              </CostBox>
              <Rating>
                Rating: <span>{rating}</span>
              </Rating>
              <Stock>
                Stock: <span>{stock}</span>
              </Stock>
              <Brand>{brand}</Brand>
              <Category>
                Category: <span>{category}</span>
              </Category>
            </Right>
          </Row>
        </ProductDetailBox>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default SingleProduct;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query;

  try {
    const singleProduct = await axios.get(
      `https://dummyjson.com/products/${slug}`
    );

    return {
      props: {
        singleProductData: singleProduct.data,
      },
    };
  } catch (error: any) {
    if (error.response.status === 401) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    } else {
      return {
        props: {
          status: 500,
        },
      };
    }
  }
};

const Wrapper = styled.div``;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  color: #333;
  margin: 30px 0;
`;

const Desc = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #333;
`;

const ProductDetailBox = styled.div`
  padding: 30px 0;

  .updateProductButton,
  .deleteProductButton {
    background: #333;
    color: #fff;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .deleteProductButton {
    background: #d61b1b;
    margin-left: 30px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
`;

const Left = styled.div`
  flex: 0 0 50%;
  max-width: 100%;
  padding: 0 15px;
`;

const Right = styled.div`
  flex: 0 0 50%;
  max-width: 100%;
  padding: 0 15px;
  position: relative;
`;

const BreadCrumb = styled.div`
  display: flex;

  a {
    &:not(:last-child) {
      &::after {
        content: "/";
        display: inline-flex;
        margin: 0 5px;
      }
    }
  }
`;

const CostBox = styled.div`
  display: flex;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  color: #15ac3b;
  display: block;
`;

const DiscountPercentage = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  color: #d62828;
  margin-left: 10px;
`;

const Rating = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 30px;
  color: #2e2e2e;
  display: block;

  span {
    font-size: 14px;
  }
`;

const Stock = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 30px;
  color: #2e2e2e;
  display: block;
  span {
    font-size: 14px;
  }
`;

const Brand = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  color: #646464;
  display: block;
  position: absolute;
  top: -10px;
  right: -10px;
  background: #333;
  color: #fff;
  padding: 0 15px;
  border-radius: 4px;
`;

const Category = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #646464;
  span {
    font-size: 14px;
    color: #2e2e2e;
    display: block;
    text-transform: capitalize;
  }
`;
