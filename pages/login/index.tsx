import styled from "styled-components";
import Container from "@/components/Tools/Container";
import Input from "@/components/Tools/Input";
import BG from "@/assets/images/login_bg.png";
import Button from "@/components/Tools/Button";
import useLogin from "@/hooks/auth/useLogin";
import { useState } from "react";

const Login = () => {

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  })

  console.log(loginCredentials)

  const { loginMutate } = useLogin();
  return (
    <Wrapper>
      <Container>
        <Title>BookBuzz</Title>
        <Row>
          <Left>
            <Image src={BG.src} alt="bg image" />
          </Left>
          <Right>
            <Title>Log In</Title>
            <Box>
              <Input type="text" id="email" labelName="Email" envelope onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })} />
              <Input type="password" id="password" labelName="Password" eye onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })} />
              <Button
                buttonName="Log In"
                width={"100%"}
                align={"center"}
                borderRadius="40px"
                onClick={() => loginMutate(loginCredentials)}
              />
            </Box>
          </Right>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div``;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  color: #000;
  margin-bottom: 30px;
`;

const Row = styled.div`
  display: flex;
`;
const Left = styled.div`
  max-width: 100%;
  flex: 0 0 50%;
`;
const Right = styled.div`
  max-width: 400px;
  margin: 0 auto;
  flex: 0 0 50%;
`;
const Box = styled.div``;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 50%;
`;
