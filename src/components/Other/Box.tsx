import React, { HTMLAttributes } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  row?: boolean;
  column?: boolean;
}

const Box: React.FC<BoxProps> = ({
  children,
  row,
  column,
  style,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        ...(row ? RowFlex : {}),
        ...(column ? { ...RowFlex, flexDirection: "column" } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const RowFlex = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
};

export default Box;
