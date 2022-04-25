import React from "react";
import Box from "../Other/Box";

interface CopyProps {
  size?: number | string;
  color?: string;
}

const Copy: React.FC<CopyProps> = ({ size, color = "#2c3e50" }) => {
  return (
    <Box column>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-folders"
        width={size}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke={color}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
        <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
      </svg>
    </Box>
  );
};

export default Copy;
