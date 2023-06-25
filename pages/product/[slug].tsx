import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Header from "@/components/Tools/Header";
import Footer from "@/components/Tools/Footer";
import Container from "@/components/Tools/Container";
import { GetServerSideProps } from "next";
import axios from "axios";
import { IGenericProduct } from "@/types/globalTypes";
import Slider from "@/components/Tools/Slider";
import useDeleteProduct from "@/hooks/products/useDeleteProduct";
import { BASE_URL } from "@/services/api";

interface Props {
  singleProductData: any;
}

const SingleProduct = ({ singleProductData }: Props) => {
  console.log(singleProductData);
  const {
    id,
    title,
    subtitleShort,
    subtitleLong,
    numOfLikes,
    authors,
    tags,
    price,
    mainImage,
    images,
  } = singleProductData.result;

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
              <Desc>{subtitleShort}</Desc>
              <CostBox>
                <Price>${price}</Price>
                <DiscountPercentage>{numOfLikes} % OFF</DiscountPercentage>
              </CostBox>
            </Right>
          </Row>
        </ProductDetailBox>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default SingleProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const cookies = context.req.cookies;
  const { auth } = cookies;

  try {
    const singleProduct = await fetch(
      `${BASE_URL}/product/details?productId=${slug}`,
      {
        headers: {
          Authorization: "Bearer " + auth,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const singleProductData = await singleProduct.json();

    return {
      props: {
        singleProductData: singleProductData,
      },
    };
  } catch (error: any) {
    return {
      props: {
        status: 500,
      },
    };
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
