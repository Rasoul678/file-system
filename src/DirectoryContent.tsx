import React, { useContext, useMemo } from "react";
import Card from "./components/Card";
import EmptyCard from "./components/Card/EmptyCard";
import Heading from "./components/Heading";
import Box from "./components/Other/Box";
import { bytesToSize } from "./utils/helpers";
import { FileSystemContext } from "./context/FileSystemContext";

interface DirectoryContentProps {}

const DirectoryContent: React.FC<DirectoryContentProps> = () => {
  const context = useContext(FileSystemContext);

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
    // console.log(context?.fs.currentDirectoryPath);
  };

  return (
    <Box>
      {context?.content.length === 0 ? (
        <EmptyCard />
      ) : (
        <>
          <Heading level={3}>Directory:</Heading>
          <Box row style={{ justifyContent: "stretch", flexWrap: "wrap" }}>
            {dirContent?.map((item: any, index: number) => {
              return (
                <Card
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
