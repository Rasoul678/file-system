import React from "react";
import Box from "../Other/Box";

interface EditProps {
  size?: number | string;
  color?: string;
}

const Edit: React.FC<EditProps> = ({ size, color = "#2c3e50" }) => {
  return (
    <Box column>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-edit"
        width={size}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke={color}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
        <line x1="16" y1="5" x2="19" y2="8" />
      </svg>
    </Box>
  );
};

export default Edit;
