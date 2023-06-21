import styled from "styled-components";
import Link from "next/link";
import { GenericProduct, IProductDetails } from "@/types/globalTypes";

const Product = ({ products }: IProductDetails<GenericProduct>) => {
  return (
    <Column>
      <Link href={`/product/${products.id}`}>
        <ProdcutDetailBox>
          <ImageBox>
            <img src={products.thumbnail} alt={products.title} />
          </ImageBox>
          <Title>{products.title}</Title>

          <Desc>{products.description}</Desc>
          <CostBox>
            <b>Price:</b>
            <Price>${products.price}</Price>
            <DiscountPercentage>
              {products.discountPercentage} % OFF
            </DiscountPercentage>
          </CostBox>

          <RatingStockBox>
            <Rating>
              Rating: <span>{products.rating}</span>
            </Rating>
            <Stock>
              Stock: <span>{products.stock}</span>
            </Stock>
          </RatingStockBox>

          <Brand>{products.brand}</Brand>
          <Category>
            Category: <span>{products.category}</span>
          </Category>
        </ProdcutDetailBox>
      </Link>
    </Column>
  );
};

export default Product;

const Column = styled.div`
  padding: 0 15px;
  width: calc(100% / 4);
  margin-bottom: 30px;
`;

const ImageBox = styled.div`
  object-fit: cover;
  height: 200px;
  overflow: hidden;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  color: #333;
  margin: 20px 0 15px;
`;

const Desc = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #333;
  word-break: break-word;
`;

const CostBox = styled.div`
  display: flex;

  b {
    font-size: 12px;
    color: #333;
    margin-right: 10px;
  }
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

const RatingStockBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Stock = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 30px;
  color: #2e2e2e;

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
  top: 0;
  right: 0;
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

const ProdcutDetailBox = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
  position: relative;
`;
