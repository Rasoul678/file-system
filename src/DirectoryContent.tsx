import React, { useContext, useEffect, useMemo, useState } from "react";
import Card from "./components/Card";
import EmptyCard from "./components/Card/EmptyCard";
import Heading from "./components/Heading";
import Box from "./components/Other/Box";
import { bytesToSize } from "./utils/helpers";
import { FileSystemContext } from "./context/FileSystemContext";
import ContextMenu from "./components/ContextMenu";
import { contextType } from "./types";

interface DirectoryContentProps {}

const DirectoryContent: React.FC<DirectoryContentProps> = () => {
  const context = useContext(FileSystemContext);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const dirContent = useMemo(() => {
    return context?.content.filter(
      (item: any) => item.constructor.name === "Directory"
    );
  }, [context?.content]);

  const fileContent = useMemo(() => {
    return context?.content.filter(
      (item: any) => item.constructor.name === "FileItem"
    );
  }, [context?.content]);

  const handleOpenFolder = (path: string) => {
    context?.fs.openDirectory(path);
    context?.setCurrentPath(context?.fs.currentDirectoryPath);
    context?.setContent(context?.fs.content);
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: any
  ) => {
    e.preventDefault();
    setIsOpen(true);
    setAnchorPoint({ x: e.pageX, y: e.pageY });
    context?.setCurrentItem(item);
  };

  useEffect(() => {
    function handleClick() {
      setIsOpen(false);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const onItemClick = (actionType: contextType) => {
    switch (actionType) {
      case contextType.RENAME:
        context?.setIsModalOpen(true);
        context?.setModalType(contextType.RENAME);
        break;
      case contextType.COPY:
        context?.fs.copyItem(context?.currentItem?.name!);
        context?.setContent(context.fs.content);
        break;

      default:
        break;
    }
    setIsOpen(false);
  };

  return (
    <Box>
      {context?.content.length === 0 ? (
        <EmptyCard />
      ) : (
        <>
          <ContextMenu
            isOpen={isOpen}
            anchorPoint={anchorPoint}
            onItemClick={onItemClick}
          />
          <Heading level={3}>Directory:</Heading>
          <Box row style={{ justifyContent: "stretch", flexWrap: "wrap" }}>
            {dirContent?.map((item: any, index: number) => {
              return (
                <Card
                  onContextMenu={(e) => handleContextMenu(e, item)}
                  hoverable
                  clickable
                  key={index}
                  bgColor="#333"
                  style={{
                    width: "8rem",
                    height: "5rem",
                    borderTopRightRadius: "2rem",
                  }}
                  onClick={() => handleOpenFolder(item.path)}
                  title={item.name}
                >
                  <Heading level={3}>{item.name}</Heading>
                  Items: {item.content.length}
                </Card>
              );
            })}
          </Box>
          <Heading level={3}>File:</Heading>
          <Box row style={{ justifyContent: "stretch", flexWrap: "wrap" }}>
            {fileContent?.map((item: any, index: number) => {
              return (
                <Card
                  onContextMenu={(e) => handleContextMenu(e, item)}
                  hoverable
                  clickable
                  column
                  key={index}
                  bgColor="#333"
                  style={{
                    width: "10rem",
                    height: "8rem",
                  }}
                  title={item.name}
                >
                  <Heading level={3}>{item.name}</Heading>
                  <Box row style={{ width: "100%" }}>
                    type: {item.mimeType}
                    <span>{bytesToSize(item?.source?.size)}</span>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default DirectoryContent;
