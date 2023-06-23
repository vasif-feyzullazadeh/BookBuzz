import Head from "next/head";
import styled from "styled-components";
import Header from "@/components/Tools/Header";
import Footer from "@/components/Tools/Footer";
import Container from "@/components/Tools/Container";
import Product from "@/components/Tools/Product";
import { GetServerSideProps } from "next";
import axios from "axios";
import { BASE_URL } from "@/services/api";
import {
  GenericProduct,
  IProductDetails,
  IProducts,
} from "@/types/globalTypes";
import { useProducts } from "@/hooks/products/useProducts";
import {
  BaseSyntheticEvent,
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import useProductSearch from "@/hooks/products/useSearchProduct";
import useProductSearchMutation from "@/hooks/products/useProductSearchMutation";
import Pagination from "@/components/Tools/Pagination";
import Link from "next/link";
import { debounce } from "@/helper/helper";
import { useUsers } from "@/hooks/users/useUsers";

interface Props {
  productsData: any;
}

const Home = ({ productsData }: Props) => {
  console.log(BASE_URL);
  // States
  const [isSearchValue, setIsSearchValue] = useState<string | null>(null);
  const [isCurrentPage, setIsCurrentPage] = useState<number>(1);
  // const [isPostsPerPage, setIsPostsPerPage] = useState<number>(8);

  const [isParams, setIsParams] = useState<{
    limit: number | null;
    skip: number | null;
    select: string | null;
    total: number | null;
  }>({
    limit: null,
    skip: null,
    select: null,
    total: null,
  });

  // Api Hooks
  // const { searchData, searchIsLoading } = useProductSearch(isSearchValue); search with query
  const { searchMutate, searchData, searchIsLoading } =
    useProductSearchMutation(); // search with mutation

  // const { productsData, productsIsLoading } = useProducts(
  //   isParams,
  //   allProductsData
  // );

  // Pagination Algoritm
  const lastPostIndex =
    isParams.skip !== null ? isCurrentPage * isParams.skip : isCurrentPage * 8;
  const firstPostIndex =
    isParams.skip !== null ? lastPostIndex - isParams.skip : lastPostIndex - 8;
  const currentProducts = productsData?.products!.slice(
    firstPostIndex,
    lastPostIndex
  );

  const handleSearch = (e: BaseSyntheticEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      searchMutate({
        q: value,
      });
      setIsSearchValue(value);
    } else {
      searchMutate({
        q: null,
      });
      setIsSearchValue(null);
    }
  };

  const optimizeFn = useCallback(debounce(handleSearch, 500), []);

  const products = {
    title: "saasd",
    description: "saasd",
    price: "saasd",
    discountPercentage: 1,
    rating: 2,
    stock: 2,
    brand: "saasd",
    category: "saasd",
    thumbnail: "saasd",
    images: ["sdad", "dsdasd"],
  };

  return (
    <Wrapper>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Title>Browse All Books</Title>
        <Box>
          <Row>
            {/* <Product products={products} /> */}
          </Row>
        </Box>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Home;

//  Single Axios Request -----------------------------------------------------------------------

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   try {
//     const productsData = await axios.get(
//       `http://bookbuzz.cronhex.com/api/v1/product/explore`
//     );

//     return {
//       props: {
//         productsData: productsData.data,
//       },
//     };
//   } catch (error: any) {
//     if (error) {
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/",
//         },
//       };
//     } else {
//       return {
//         props: {
//           status: 500,
//         },
//       };
//     }
//   }
// };

export async function getServerSideProps(context: any) {
  try {
    const [categoryDataResponse, productsDataResponse] = await Promise.all([
      fetch(`https://dummyjson.com/products/categories`),
      fetch(`https://dummyjson.com/products?limit=0&skip=0&select=`),
    ]);

    const firstData = await categoryDataResponse.json();
    const secondData = await productsDataResponse.json();

    return {
      props: {
        categoryData: firstData,
        allProductsData: secondData,
      },
    };
  } catch (error: any) {
    return {
      props: {
        categoryData: null,
        allProductsData: null,
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

const Column = styled.div`
  padding: 0 15px;
`;

const Card = styled.div`
  padding: 0 15px;
`;

// Prime React Components
const FaqSection = styled.div`
  padding: 100px 0;

  .p-accordion-tab {
    margin-bottom: 10px;
    .p-accordion-header:hover .p-accordion-header-link {
      background: red;
    }
  }
`;
