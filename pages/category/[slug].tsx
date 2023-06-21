import Container from "@/components/Tools/Container";
import Header from "@/components/Tools/Header";
import Product from "@/components/Tools/Product";
import { base_URL } from "@/services/api";
import { GenericProduct, IProductDetails } from "@/types/globalTypes";
import styled from "styled-components";
import { useRouter } from "next/router";

interface Props {
  categoryData: {
    products: any;
  };
}

const Category = ({ categoryData }: Props) => {
  // Router
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Wrapper>
      <Header />
      <Container>
        <CategorySection>
          <CategoryResultBox>Results for: {slug}</CategoryResultBox>

          <Row>
            {!categoryData !== null
              ? categoryData?.products!.map((item: any) => (
                  <Product products={item} />
                ))
              : "No Categoy"}
          </Row>
        </CategorySection>
      </Container>
    </Wrapper>
  );
};

export default Category;

// With Single Fetch Request ----------------------------------------------------------------------

export async function getServerSideProps(context: any) {
  const { slug } = context.query;

  try {
    const categoryDataResponse = await fetch(
      base_URL + `/products/category/${slug}`
    );

    const data: IProductDetails<GenericProduct> =
      await categoryDataResponse.json();

    return {
      props: {
        categoryData: data,
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: null,
      },
    };
  }
}

// With Multiple Fetch Request -------------------------------------------------------------------------

// export async function getServerSideProps(context: any) {
//   const { slug } = context.query;

//   try {
//     const [categoryDataResponse, categoryResponse] = await Promise.all([
//       fetch(`https://dummyjson.com/products/category/${slug}`),
//       fetch(`https://dummyjson.com/products/categories`),
//     ]);

//     const firstData = await categoryDataResponse.json();
//     const secondData = await categoryResponse.json();

//     return {
//       props: {
//         categoryData: firstData,
//         singleCategoryData: secondData,
//       },
//     };
//   } catch (error: any) {
//     return {
//       props: {
//         categoryData: null,
//         singleCategoryData: null,
//       },
//     };
//   }
// }

const Wrapper = styled.div``;

const CategorySection = styled.div``;

const CategoryResultBox = styled.h3`
  font-size: 24px;
  font-weight: 700;
  padding: 20px 0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;
