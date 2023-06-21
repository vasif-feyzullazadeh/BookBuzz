import Head from "next/head";
import styled from "styled-components";
import Header from "@/components/Tools/Header";
import Footer from "@/components/Tools/Footer";
import Container from "@/components/Tools/Container";
import Product from "@/components/Tools/Product";
import { GetServerSideProps } from "next";
import axios from "axios";
import { base_URL } from "@/services/api";
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
import { Accordion, AccordionTab } from "primereact/accordion";

interface Props {
  categoryData: string[];
  allProductsData: IProducts<GenericProduct>;
}

const Home = ({ categoryData, allProductsData }: Props) => {
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

  const { productsData, productsIsLoading } = useProducts(
    isParams,
    allProductsData
  );

  const { usersData } = useUsers();

  console.log(usersData);

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

  return (
    <Wrapper>
      <Head>
        <title>Prodcuts - Home Page</title>
        <meta name="description" content="Prodcut - Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Container>
        <FilterBox>
          <FilterTitle>Filters</FilterTitle>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search products"
              onChange={optimizeFn.bind(this)}
            />
          </SearchBox>
          <LimitAndSkipBox>
            {/* <FilterByBox>
              <FilterByButton>Filter by</FilterByButton>
              <FilterByDropdown>
                <FilterByDropdownItem>
                  <DropdownItemTitle>Brands</DropdownItemTitle>
                  <FilterByRow>
                    <FilterByItem type={"checkbox"} id="brand-1" />
                    <FilterByLabel
                      htmlFor="brand-1"
                      onClick={() => {
                        searchMutate("");
                      }}
                    >
                      {"Apple"}
                    </FilterByLabel>
                  </FilterByRow>
                </FilterByDropdownItem>
              </FilterByDropdown>
            </FilterByBox> */}
            <LimitAndSkipItem
              onClick={() => {
                setIsParams((prev) => ({ ...prev, limit: 0 }));
                setIsCurrentPage(1);
              }}
            >
              All
            </LimitAndSkipItem>
            <LimitAndSkipItem
              onClick={() => {
                setIsParams((prev) => ({ ...prev, limit: 10 }));
                setIsCurrentPage(1);
              }}
            >
              10
            </LimitAndSkipItem>
            <LimitAndSkipItem
              onClick={() => {
                setIsParams((prev) => ({ ...prev, limit: 20 }));
                setIsCurrentPage(1);
              }}
            >
              20
            </LimitAndSkipItem>
            <LimitAndSkipItem
              onClick={() => {
                setIsParams((prev) => ({ ...prev, limit: 30 }));
                setIsCurrentPage(1);
              }}
            >
              30
            </LimitAndSkipItem>
          </LimitAndSkipBox>
        </FilterBox>
        {isSearchValue !== null ? (
          <SearchValueBox>Searched for "{isSearchValue}"</SearchValueBox>
        ) : (
          <></>
        )}
        {isSearchValue !== null ? (
          <SearchedProducts>
            <ProductsBox>
              {!searchIsLoading ? (
                <Row>
                  {searchData !== undefined &&
                  searchData.products.length !== 0 ? (
                    searchData?.products?.map((item, index) => (
                      <Product
                        products={item}
                        key={index.toString() + item.title}
                      />
                    ))
                  ) : (
                    <NoResult>No Result</NoResult>
                  )}
                </Row>
              ) : (
                <LoadingBox>
                  <span className="loader"></span>
                </LoadingBox>
              )}
            </ProductsBox>
          </SearchedProducts>
        ) : (
          <MainRow>
            <Sidebar>
              <SidebarList>
                {categoryData.map((item, index) => (
                  <SidebarListItem key={index}>
                    <Link href={`category/${item}`}>{item}</Link>
                  </SidebarListItem>
                ))}
              </SidebarList>
            </Sidebar>
            <MainProducts>
              <TopSection>
                <Title>All Products</Title>
                <ProductsLimit>
                  Shows:{" "}
                  {isParams.limit === null
                    ? "All"
                    : isParams.limit === 0
                    ? "All"
                    : isParams.limit}
                </ProductsLimit>
              </TopSection>

              <ProductsBox>
                {!productsIsLoading ? (
                  <Row>
                    {currentProducts?.map((item: any, index: any) => (
                      <Product
                        products={item}
                        key={index.toString() + item.title}
                      />
                    ))}
                  </Row>
                ) : (
                  <>Gozleyin...</>
                )}
              </ProductsBox>
              <Pagination
                totalPosts={
                  !!productsData?.products.length
                    ? productsData?.products.length
                    : 1
                }
                postsPerPage={isParams.skip !== null ? isParams.skip : 8}
                currentPage={isCurrentPage}
                setCurrentPage={setIsCurrentPage}
              />
            </MainProducts>
          </MainRow>
        )}
        <FaqSection>
          <h1>Products FAQ</h1>
          <Accordion activeIndex={0}>
            <AccordionTab header="Where is my product ?">
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionTab>
            <AccordionTab header="What is delivering period ?">
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header="Payment methods">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionTab>
          </Accordion>
        </FaqSection>
      </Container>
      {/* <Footer /> */}
    </Wrapper>
  );
};

export default Home;

//  Single Axios Request -----------------------------------------------------------------------
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   try {
//     const categoryData = await axios.get(
//       "https://dummyjson.com/products/categories"
//     );

//     return {
//       props: {
//         categoryData: categoryData.data,
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
`;

const MainRow = styled.div`
  display: flex;
`;

const Sidebar = styled.aside`
  max-width: 300px;
  width: 100%;

  border-radius: 4px;
  margin-right: 30px;
`;
const SidebarList = styled.ul`
  border: 1px solid #eee;
`;
const SidebarListItem = styled.li`
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: #333;
    text-transform: uppercase;
  }
`;

const MainProducts = styled.div``;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ProductsLimit = styled.div`
  border: 1px solid #333;
  padding: 5px;
  border-radius: 4px;
  width: 100px;
`;

const SearchedProducts = styled.div``;

const ProductsBox = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  color: #333;
  margin-bottom: 30px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

const FilterBox = styled.div`
  background: #333;
  margin-top: 30px;
  padding: 20px 30px;
  border-radius: 8px;
  display: flex;
  margin-bottom: 30px;
`;

const FilterTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 30px;
  color: #fff;
`;

const SearchBox = styled.div`
  max-width: 200px;
  margin-left: 30px;
`;

const LimitAndSkipBox = styled.div`
  display: flex;
  margin-left: auto;
`;

const LimitAndSkipItem = styled.span`
  cursor: pointer;
  margin-right: 15px;
  color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
`;

const SearchValueBox = styled.div`
  margin: 30px 0;
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const NoResult = styled.div`
  margin: 30px 0;
  padding: 0 15px;
  text-align: center;
  width: 100%;
`;

const LoadingBox = styled.div`
  text-align: center;
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #c1c1c1;
    border-bottom-color: #ff3d00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const FilterByBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

const FilterByRow = styled.div`
  display: flex;
`;

const FilterByDropdown = styled.div`
  width: 200px;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  position: absolute;
  top: 40px;
  right: 0;
  border: 1px solid #eee;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
`;

const FilterByDropdownItem = styled.div``;

const DropdownItemTitle = styled.h6`
  font-size: 14px;
  margin: 0 0 10px;
`;

const FilterByButton = styled.button`
  background: orange;
  width: 100px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FilterByLabel = styled.label``;

const FilterByItem = styled.input`
  margin-right: 10px;
  cursor: pointer;
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
