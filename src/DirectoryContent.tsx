import React, { useContext, useMemo } from "react";
import Card from "./components/Card";
import EmptyCard from "./components/Card/EmptyCard";
import Heading from "./components/Heading";
import Box from "./components/Other/Box";
import { Directory, FileItem } from "./utils/fileSystem";
import { bytesToSize } from "./utils/helpers";
import { FileSystemContext } from "./index";

type Item = Directory | FileItem;

interface DirectoryContentProps {
  content: Item[];
}

const DirectoryContent: React.FC<DirectoryContentProps> = ({ content }) => {
  const fs = useContext(FileSystemContext);

  const dirContent = useMemo(() => {
    return content.filter((item: any) => item.constructor.name === "Directory");
  }, [content]);

  const fileContent = useMemo(() => {
    return content.filter((item: any) => item.constructor.name === "FileItem");
  }, [content]);

  const handleOpenFolder = (path: string) => {
    fs.openDirectory(path);
    console.log(fs);
  };

  return (
    <Box>
      {content.length === 0 ? (
        <EmptyCard />
      ) : (
        <>
          <Heading level={3}>Directory:</Heading>
          <Box row style={{ justifyContent: "stretch", flexWrap: "wrap" }}>
            {dirContent.map((item: any, index: number) => {
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
            {fileContent.map((item: any, index: number) => {
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
