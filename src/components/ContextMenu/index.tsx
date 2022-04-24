import React from "react";
import { Motion, spring } from "react-motion";
import style from "styled-components";
import useContextMenu from "../../hooks/useContextMenu";
import Card from "../Card";

interface ContextMenuProps {}

const ContextMenu: React.FC<ContextMenuProps> = () => {
  const { isOpen, anchorPoint } = useContextMenu();

  if (isOpen) {
    return (
      <Motion
        defaultStyle={{ opacity: 0 }}
        style={{ opacity: !isOpen ? spring(0) : spring(1) }}
      >
        {(interpolatedStyle) => (
          <StyledCard
            style={{
              top: anchorPoint.y,
              left: anchorPoint.x,
              opacity: interpolatedStyle.opacity,
            }}
          >
            <ul>
              <li>copy</li>
              <li>move</li>
              <li>delete</li>
            </ul>
          </StyledCard>
        )}
      </Motion>
    );
  }
  return <></>;
};

const StyledCard = style(Card)`
  font-size: 1rem;
  width: 150px;
  height: auto;
  margin: 0;
  position: absolute;
  list-style: none;
  box-shadow: 0 0 20px 0 #ccc;
  opacity: 1;
  transition: opacity 0.5s linear;
`;

export default ContextMenu;
