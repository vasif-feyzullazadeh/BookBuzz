import styled from "styled-components";
import Container from "@/components/Tools/Container";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";

interface Props {
  sliders: [];
}

const Slider = ({ sliders }: Props) => {
  console.log(sliders);
  return (
    <Wrapper>
      <Container>
        <SliderBox>
          <Center>
            <Splide
              aria-label="My Favorite Images"
              options={{
                type: "loop",
                rewind: true,
                autoplay: true,
                lazyLoad: true,
              }}
            >
              {sliders.map((productImage, index) => (
                <SplideSlide key={index}>
                  <CenterImageBox>
                    <img src={productImage} alt="" />
                  </CenterImageBox>
                </SplideSlide>
              ))}
            </Splide>
          </Center>
        </SliderBox>
      </Container>
    </Wrapper>
  );
};

export default Slider;

const Wrapper = styled.div`
  margin: 24px 0 0;
`;

const SliderBox = styled.div`
  display: flex;
  margin: 0 -10px;
`;

const Center = styled.div`
  padding: 0 10px;
  .splide {
    padding: 0;
    border-radius: 4px;
    overflow: hidden;
  }
`;

const CenterImageBox = styled.div`
  display: flex;
  a {
    display: inline-flex;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
