import React from "react";
import Box from "../Other/Box";

interface BackProps {
  size?: number | string;
}

const Back: React.FC<BackProps> = ({ size }) => {
  return (
    <Box column>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-arrow-left"
        width={`${size}`}
        viewBox="0 0 23 23"
        strokeWidth="2"
        stroke="#fff"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="5" y1="12" x2="11" y2="18" />
        <line x1="5" y1="12" x2="11" y2="6" />
      </svg>
    </Box>
  );
};

export default Back;
