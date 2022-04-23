import React, { HTMLAttributes } from "react";
import style from "styled-components";
import Box from "../Other/Box";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

const StyledButton = style(Box)`
    background-color: ${(props: Pick<ButtonProps, "variant">) =>
      props.variant === "primary" ? "#FFF" : "#111"};
    color: ${(props: Pick<ButtonProps, "variant">) =>
    props.variant === "primary" ? "#111" : "#FFF"};
    border-radius: 1.5rem;
    padding: 1rem;
    width: max-content;
    max-height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
`;

export default Button;
