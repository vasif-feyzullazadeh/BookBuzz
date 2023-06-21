import { useProduct } from "@/hooks/products/useProduct";
import styled from "styled-components";
import { useRouter } from "next/router";
import useProductSearch from "@/hooks/products/useSearchProduct";
import { useState } from "react";

const index = () => {
  // States
  const [isSearchValue, setIsSearchValue] = useState<string | null>(null);
  // Global States
  const { searchData, searchIsLoading } = useProductSearch(isSearchValue);

  return (
    <Wrapper>
      <SearchBox>
        <SearchInput
          onChange={(e) => {
            e.target.value !== ""
              ? setIsSearchValue(e.target.value)
              : setIsSearchValue(null);
          }}
        />
      </SearchBox>
      <ProductBox>
        {!searchIsLoading ? (
          <>
            {searchData !== undefined && searchData.products.length !== 0 ? (
              searchData?.products?.map((product, index) => (
                <ProductItem key={index + product.title}>
                  {product.title}
                </ProductItem>
              ))
            ) : (
              <>No Result</>
            )}
          </>
        ) : (
          <>Loading</>
        )}
      </ProductBox>
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div``;

const SearchBox = styled.div``;

const SearchInput = styled.input``;

const ProductBox = styled.div``;

const ProductItem = styled.div``;
