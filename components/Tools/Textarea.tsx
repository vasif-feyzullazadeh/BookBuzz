import styled from "styled-components";

interface Props {
  name: string;
  id: string;
  labelName: string;
  className?: string;
  setIsValue?: any;
}

const TextareaField = ({
  name,
  id,
  className,
  labelName,
  setIsValue,
}: Props) => {
  //States

  return (
    <>
      <TextAreaBox className={className}>
        <Textarea
          name={name}
          className="textarea"
          id={id}
          placeholder=" "
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setIsValue((prev?: any) => ({
              ...prev,
              [name]: !!e.target.value ? e.target.value : "",
            }));
          }}
        ></Textarea>
        <Label htmlFor={id} className="label">
          {labelName}
        </Label>
      </TextAreaBox>
    </>
  );
};

export default TextareaField;

const TextAreaBox = styled.div`
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
    top: 24px;
    padding: 0 5px;
    transform: translateY(-50%);
    transition: 0.25s ease-in-out;
    cursor: inherit;
  }

  .textarea {
    background: #ffffff;
    border: 1px solid #dadada;
    border-radius: 4px;
    width: 100%;
    display: block;
    padding: 10px 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #2a2b3c;
    resize: none;
  }

  .textarea:focus ~ .label,
  .textarea:not(:placeholder-shown).textarea:not(:focus) ~ .label {
    top: 0;
    font-size: 11px;
    background: #fff;
  }
`;

const Textarea = styled.textarea``;

const Label = styled.label``;
