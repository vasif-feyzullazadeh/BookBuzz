import styled from "styled-components";
import Container from "@/components/Tools/Container";
import Link from "next/link";

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Link href={"/"}>
            <Logo>My Logo</Logo>
          </Link>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  padding: 30px 20px;
  background: #333;
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 24px;
  color: #fff;
`;
