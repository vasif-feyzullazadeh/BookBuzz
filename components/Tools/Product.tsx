import styled from "styled-components";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { IProducts, IGenericProduct } from "@/types/globalTypes";

const Product = ({ products }: IProducts<IGenericProduct>) => {
  const { id, images, mainImage, numOfLikes, price, subtitleShort, title } =
    products;
  return (
    <Column>
      <Link href={`/product/${id}`} className="card_link">
        <ProdcutDetailBox>
          <ImageBox>
            <img src={mainImage} alt={title} />
          </ImageBox>
          <Title>{title}</Title>
          <Desc>{subtitleShort}</Desc>
          <Row>
            <CostBox>
              <Price>${price}</Price>
            </CostBox>
            <Like>
              <AiFillHeart color={"#000"} size={16} className="heart_icon" />
              <LikeCount>{numOfLikes}</LikeCount>
            </Like>
          </Row>
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

  .card_link {
    display: block;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
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

const CostBox = styled.div``;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #000;
  display: block;
`;

const ProdcutDetailBox = styled.div`
  background: #f0f0f0;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
  position: relative;
`;

const Like = styled.span`
  width: 50px;
  border-radius: 40px;
  color: #000;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .heart_icon {
    margin-right: 5px;
  }
`;

const LikeCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000;
`;
