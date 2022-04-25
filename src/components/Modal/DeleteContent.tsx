import React, { useContext } from "react";
import Box from "../Other/Box";
import { FileSystemContext } from "../../context/FileSystemContext";

interface DeleteContentProps {}

const DeleteContent: React.FC<DeleteContentProps> = () => {
  const context = useContext(FileSystemContext);

  return (
    <Box
      style={{
        fontSize: "1.3rem",
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      You are about to delete "{context?.currentItem?.name}". This cannot be
      undone!
    </Box>
  );
};

export default DeleteContent;
