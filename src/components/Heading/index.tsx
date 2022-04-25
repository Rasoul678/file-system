import React, { HTMLAttributes } from "react";
import { HeadingTag } from "../../types";
import style from "styled-components";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: React.FC<HeadingProps> = ({ level = 1, children, ...props }) => {
  const Tag = `h${level}` as HeadingTag;
  return <Tag {...props}>{children}</Tag>;
};

const Wrapper = style(Heading)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  `;

export default Wrapper;
