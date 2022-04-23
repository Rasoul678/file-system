import React, { InputHTMLAttributes } from "react";
import style from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

const StyledInput = style.input`
    width: calc(100% - 1rem);
    height: 1.5rem;
    border: none;
    border-radius: 0.4rem;
    padding: 0.5rem;
    font-size: 1.2rem;
`;

export default Input;
