import React, { HTMLAttributes } from "react";
import Box from "../Other/Box";
import style from "styled-components";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  bgColor?: string;
  children?: React.ReactNode;
  row?: boolean;
  column?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  bgColor,
  row,
  column,
  hoverable,
  clickable,
  ...props
}) => {
  return (
    <StyledCard
      {...props}
      row={row}
      column={column}
      bgColor={bgColor}
      hoverable={hoverable}
      clickable={clickable}
    >
      {children}
    </StyledCard>
  );
};

const WrappedBox = ({ bgColor, hoverable, clickable, ...props }: CardProps) => {
  return <Box {...props} />;
};

const StyledCard = style(WrappedBox)`
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 0.4rem;
    padding: 1rem;
    cursor: ${({ clickable }) => (clickable ? "pointer" : "initial")};
    transition: all 0.3s ease-in-out;

    :hover{
      background-color: ${({ hoverable }) => (hoverable ? "crimson" : "none")};
    }

`;

export default Card;
