import Link from "next/link";
import styled from "styled-components";

interface Props {
  buttonName: string;
  width: string;
  align: string;
  borderRadius: string;
  className?: string;
  url?: string;
  onClick?: any;
}

const Button = ({
  buttonName,
  width,
  align,
  borderRadius,
  className,
  url,
  onClick,
}: Props) => {
  return (
    <ButtonBox
      align={align}
      width={width}
      className={className}
      borderRadius={borderRadius}
    >
      {url ? (
        <Link href={url}>{buttonName}</Link>
      ) : (
        <button className="button" onClick={onClick}>
          {buttonName}
        </button>
      )}
    </ButtonBox>
  );
};

export default Button;

const ButtonBox = styled.div<{
  align: string;
  width: string;
  borderRadius: string;
}>`
  display: flex;
  justify-content: ${({ align }) => align};
  .button,
  a {
    background: #000;
    box-shadow: 2px 10px 35px rgba(45, 73, 226, 0.1);
    border-radius: ${({ borderRadius }) => borderRadius};
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #ffffff;
    transition: 0.25s ease-in-out;
    cursor: pointer;
    width: ${({ width }) => width};

    &:hover {
      background: #414141;
    }
  }
`;
