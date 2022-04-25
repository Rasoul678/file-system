import React, { useCallback } from "react";
import { Motion, spring } from "react-motion";
import style from "styled-components";
import Card from "../Card";
import Edit from "../Icons/Edit";
import Delete from "../Icons/Delete";
import Copy from "../Icons/Copy";
import Move from "../Icons/Move";
import { contextType } from "../../types";

interface ContextMenuProps {
  isOpen: boolean;
  anchorPoint: { x: number; y: number };
  onItemClick?: (actionName: contextType) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { isOpen, anchorPoint, onItemClick } = props;

  const handleClick = useCallback(
    (actionName: contextType) => () => {
      onItemClick?.(actionName);
    },
    [onItemClick]
  );

  const getIcon = useCallback((type: contextType) => {
    switch (type) {
      case contextType.RENAME:
        return <Edit size={25} />;
      case contextType.DELETE:
        return <Delete size={25} />;
      case contextType.COPY:
        return <Copy size={25} />;
      case contextType.MOVE:
        return <Move size={25} />;

      default:
        return;
    }
  }, []);

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
            <StyledUl>
              {[
                contextType.RENAME,
                contextType.DELETE,
                contextType.COPY,
                contextType.MOVE,
              ].map((actionName, index) => (
                <StyledLi onClick={handleClick(actionName)} key={index}>
                  {getIcon(actionName)}
                  {actionName}
                </StyledLi>
              ))}
            </StyledUl>
          </StyledCard>
        )}
      </Motion>
    );
  }
  return <></>;
};

const StyledCard = style(Card)`
  width: 10rem;
  height: auto;
  margin: 0;
  padding: 0;
  position: absolute;
  background-color: #FFF;
  color: #333;
  box-shadow: 0 0 5px 0 #676767;
  opacity: 1;
  transition: opacity 0.2s linear;
  overflow: hidden;
`;

const StyledUl = style.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLi = style.li`
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  text-transform: capitalize;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid #CCC;
  }

  :hover{
    background-color: #CCC;
  }
`;

export default ContextMenu;
