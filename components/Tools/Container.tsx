import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;

const Wrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;
