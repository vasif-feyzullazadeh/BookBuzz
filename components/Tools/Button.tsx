"use client";

import styled from "styled-components";

interface Props {
  buttonName: string;
  width: string;
  align: string;
  className?: string;
  onClick?: any;
}

const Button = ({ buttonName, width, align, className, onClick }: Props) => {
  return (
    <ButtonBox
      align={align}
      width={width}
      className={className}
      onClick={onClick}
    >
      <button className="button">{buttonName}</button>
    </ButtonBox>
  );
};

export default Button;

const ButtonBox = styled.div<{ align: string; width: string }>`
  display: flex;
  justify-content: ${({ align }) => align};
  .button {
    background: #62bac6;
    box-shadow: 2px 10px 35px rgba(45, 73, 226, 0.1);
    border-radius: 4px;
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
      background: #4b99a3;
    }
  }
`;
