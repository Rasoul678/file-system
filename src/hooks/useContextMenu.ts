import { useCallback, useEffect, useState } from "react";

const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault(); //! prevent default browser context menu
    setAnchorPoint({ x: e.pageX, y: e.pageY });
    setIsOpen(true);
  }, []);

  const handleClick = useCallback(
    () => (isOpen ? setIsOpen(false) : null),
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleContextMenu, handleClick]);

  return { anchorPoint, isOpen };
};

export default useContextMenu;
