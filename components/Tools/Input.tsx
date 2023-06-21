import styled from "styled-components";
import { useState } from "react";

interface Props {
  type: string;
  name: string;
  id: string;
  labelName: string;
  className?: string;
  eye?: boolean;
  setIsValue?: any;
}

const InputField = ({
  type,
  name,
  id,
  className,
  labelName,
  eye,
  setIsValue,
}: Props) => {
  //States
  const [isEye, setIsEye] = useState<boolean>(false);

  return (
    <>
      <InputBox className={className}>
        <Input
          type={!isEye ? type : "text"}
          name={name}
          className="input"
          id={id}
          placeholder=" "
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsValue((prev?: any) => ({
              ...prev,
              [name]: !!e.target.value ? e.target.value : "",
            }));
          }}
        />
        <Label htmlFor={id} className="label">
          {labelName}
        </Label>
        {eye ? (
          <Eye onClick={() => setIsEye((prev) => !prev)}>
            {!isEye ? (
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3866 8C10.3866 9.32 9.31995 10.3867 7.99995 10.3867C6.67995 10.3867 5.61328 9.32 5.61328 8C5.61328 6.68 6.67995 5.61333 7.99995 5.61333C9.31995 5.61333 10.3866 6.68 10.3866 8Z"
                  stroke="#ADADAD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.9999 13.5133C10.3532 13.5133 12.5466 12.1267 14.0732 9.72667C14.6732 8.78667 14.6732 7.20667 14.0732 6.26667C12.5466 3.86667 10.3532 2.48 7.9999 2.48C5.64656 2.48 3.45323 3.86667 1.92656 6.26667C1.32656 7.20667 1.32656 8.78667 1.92656 9.72667C3.45323 12.1267 5.64656 13.5133 7.9999 13.5133Z"
                  stroke="#ADADAD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.68661 6.31333L6.31328 9.68667C5.87995 9.25333 5.61328 8.66 5.61328 8C5.61328 6.68 6.67995 5.61333 7.99995 5.61333C8.65995 5.61333 9.25328 5.88 9.68661 6.31333Z"
                  stroke="#ADADAD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.8799 3.84667C10.7132 2.96667 9.3799 2.48667 7.9999 2.48667C5.64656 2.48667 3.45323 3.87333 1.92656 6.27333C1.32656 7.21333 1.32656 8.79334 1.92656 9.73334C2.45323 10.56 3.06656 11.2733 3.73323 11.8467"
                  stroke="#ADADAD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.61328 13.02C6.37328 13.34 7.17995 13.5133 7.99995 13.5133C10.3533 13.5133 12.5466 12.1267 14.0733 9.72667C14.6733 8.78667 14.6733 7.20667 14.0733 6.26667C13.8533 5.92 13.6133 5.59333 13.3666 5.28667"
                  stroke="#ADADAD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.34 8.46667C10.1666 9.40667 9.39996 10.1733 8.45996 10.3467"
                  stroke="#ADADAD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.31325 9.68667L1.33325 14.6667"
                  stroke="#ADADAD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6668 1.33333L9.68677 6.31333"
                  stroke="#ADADAD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Eye>
        ) : (
          <></>
        )}
      </InputBox>
    </>
  );
};

export default InputField;

const InputBox = styled.div`
  position: relative;
  &:not(:last-child) {
    margin-bottom: 25px;
  }
  .label {
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #adadad;
    position: absolute;
    left: 11px;
    top: 50%;
    padding: 0 5px;
    transform: translateY(-50%);
    transition: 0.25s ease-in-out;
    cursor: inherit;
  }

  .input {
    background: #ffffff;
    border: 1px solid #dadada;
    border-radius: 4px;
    width: 100%;
    display: block;
    height: 45px;
    padding: 0 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #2a2b3c;
  }

  .input:focus ~ .label,
  .input:not(:placeholder-shown).input:not(:focus) ~ .label {
    top: 0;
    font-size: 11px;
    background: #fff;
  }
`;

const Input = styled.input``;

const Label = styled.label``;

const Eye = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: inline-flex;
`;
