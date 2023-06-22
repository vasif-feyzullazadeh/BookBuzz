import React from "react";
// import useUserData from "@/hooks/user/account/useUserData";
import styled from "styled-components";
import Header from "@/components/Tools/Header";
import Footer from "@/components/Tools/Footer";

interface Props {
  header?: boolean;
  footer?: boolean;
  children: React.ReactNode;
}

const Layout = ({ header, footer, children }: Props) => {
  // Api Hooks
  //   const { userData } = useUserData();
  const userData = ["salam"];

  return (
    <Wrapper>
      {header ? <Header userData={userData} /> : <></>}
      {children}
      {footer ? <Footer /> : <></>}
    </Wrapper>
  );
};

export default React.memo(Layout);

const Wrapper = styled.div``;
