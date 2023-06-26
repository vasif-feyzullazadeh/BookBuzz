"use client";

import styled from "styled-components";
import Container from "@/components/Tools/Container";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import Button from "@/components/Tools/Button";
import Profile from "@/assets/images/profile.jpg";
import { parseCookies } from "nookies";
import { ChangeEvent, useCallback } from "react";
import { debounce } from "@/helper/helper";

interface Props {
  setSearch: (params: any) => void;
  profile?: boolean;
}

const Header: React.FC<Props> = ({ setSearch, profile }) => {
  const cookies = parseCookies();
  const { auth } = cookies;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const optimizeFn = useCallback(debounce(handleSearchChange, 500), []);

  return (
    <Wrapper>
      <Container>
        <Row>
          <SearchBox>
            <Input
              type="text"
              placeholder="Search for books by title, author or keyword"
              onChange={optimizeFn.bind(this)}
            />
            <BiSearch color={"#000"} size={16} className="search_icon" />
          </SearchBox>
          <CartBox>
            <Link href={"/cart"} className="cart_link">
              Cart
            </Link>
          </CartBox>
          {auth && !auth ? (
            <Button
              buttonName="Login"
              className="login_btn"
              borderRadius="10px"
              width="100px"
              align="center"
              url={"/login"}
            />
          ) : (
            <></>
          )}

          <Account>
            <Frame>
              <Image src={Profile.src} alt="profile" />
            </Frame>
          </Account>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  padding: 20px 20px 30px;

  .login_btn {
    margin-left: 50px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchBox = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  height: 40px;

  input {
    border-radius: 10px;
  }

  .search_icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 40px;
  border: 1px solid #b9b9b9;
  padding: 0 15px;
`;

const CartBox = styled.div`
  margin: 0 0 0 auto;
  .cart_link {
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    color: #000;
  }
`;

const Account = styled.div`
  display: flex;
`;

const Frame = styled.figure`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  overflow: hidden;
  margin: 0 0 0 40px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
