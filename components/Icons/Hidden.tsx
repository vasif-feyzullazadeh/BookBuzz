interface Props {
  className?: string;
}

const HiddenIcon = ({ className }: Props) => {
  return (
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
  );
};

export default HiddenIcon;
