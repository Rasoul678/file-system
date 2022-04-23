import React, { Fragment, useCallback, useContext } from "react";
import { FileSystemContext } from "../../context/FileSystemContext";
import Button from "../Button";
import Box from "../Other/Box";

interface BreadcrumbProps {
  items: string[] | undefined;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const context = useContext(FileSystemContext);

  const handleClickPath = useCallback(
    (dirName: string) => () => {
      context?.fs.goBackToDirectory(dirName);
      context?.setCurrentPath(context?.fs.currentDirectoryPath);
      context?.setContent(context?.fs.content);
    },
    [context]
  );

  return (
    <Box row>
      {items?.map((item: string, index: number) => {
        return (
          <Fragment key={index}>
            {index === 0 ? " " : "/"}
            <Button
              onClick={handleClickPath(item)}
              style={{ padding: "0.5rem 0.8rem", fontSize: "0.8rem" }}
            >
              {item}
            </Button>
          </Fragment>
        );
      })}
    </Box>
  );
};

export default Breadcrumb;
