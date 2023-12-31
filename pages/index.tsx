import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import Header from "@/components/Tools/Header";
import Footer from "@/components/Tools/Footer";
import Container from "@/components/Tools/Container";
import Product from "@/components/Tools/Product";
import { BASE_URL } from "@/services/api";
import { IGenericProduct, IProducts } from "@/types/globalTypes";
import useProductSearch from "@/hooks/products/useSearchProduct";

interface Props {
  productsData: {
    result: {
      products: IProducts<IGenericProduct>[];
    };
  };
}

const Home = ({ productsData }: Props) => {
  const [search, setSearch] = useState(null);

  const { searchData } = useProductSearch(search);

  console.log(searchData, search, "search");
  return (
    <Wrapper>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header setSearch={setSearch} />
      <Container>
        <Title>
          {search !== null && search !== ""
            ? `search for: ${search}`
            : "Browse All Books"}
        </Title>
        <Box>
          <Row>
            {search !== null && search !== "" ? (
              searchData?.result.products.length > 0 ? (
                searchData.result.products.map((item: any, index: number) => (
                  <Product products={item} key={index.toString()} />
                ))
              ) : (
                <NoResult>No Result</NoResult>
              )
            ) : (
              productsData.result.products.map((item: any, index: number) => (
                <Product products={item} key={index.toString()} />
              ))
            )}
          </Row>
        </Box>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const cookies = context.req.cookies;
  const { auth } = cookies;

  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  try {
    const productsData = await fetch(`${BASE_URL}/product/explore`, {
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const products = await productsData.json();

    return {
      props: {
        productsData: products,
      },
    };
  } catch (error: any) {
    console.log("error");
    return {
      props: {
        productsData: null,
      },
    };
  }
}

const Wrapper = styled.div``;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  color: #333;
  margin-bottom: 40px;
`;

const Box = styled.div`
  margin: 30px 0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

const NoResult = styled.span`
  padding: 10px 15px;
`;
