import styled from "styled-components";
import { useState } from "react";
// import { useLoginForm } from "global-states/global.states";
import VisibleIcon from "@/components/Icons/VisibleIcon";
import HiddenIcon from "@/components/Icons/Hidden";
import { BsEnvelope } from "react-icons/bs";

interface Props {
  type: string;
  id: string;
  labelName?: string;
  placeholder?: string;
  eye?: boolean;
  envelope?: boolean;
  setIsValue?: any;
  onChange?: (params: any) => void;
}

const InputField = ({
  type,
  id,
  labelName,
  placeholder,
  eye,
  envelope,
  setIsValue,
  onChange,
}: Props) => {
  //States
  const [isEye, setIsEye] = useState<boolean>(false);

  return (
    <>
      <InputBox>
        <Input
          type={!isEye ? type : "text"}
          className="input"
          id={id}
          placeholder={labelName ? " " : placeholder}
          onChange={onChange}
          autoComplete="off"
        />
        {labelName && (
          <Label htmlFor={id} className="label">
            {labelName}
          </Label>
        )}
        {eye && (
          <Eye onClick={() => setIsEye((prev) => !prev)}>
            {!isEye ? <HiddenIcon /> : <VisibleIcon />}
          </Eye>
        )}
        {envelope && (
          <Envelope>
            <BsEnvelope color={"#ADADAD"} size={16} />
          </Envelope>
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
    border-radius: 40px;
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

const Envelope = styled(Eye)``;
