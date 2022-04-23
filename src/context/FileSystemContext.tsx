import React, { createContext, useState } from "react";
import { Directory, FileSystem, FileItem } from "../utils/fileSystem";

interface FileSystemContextProps {
  children?: React.ReactNode;
}

interface ContextProps {
  fs: FileSystem;
  currentPath: string[];
  setCurrentPath: React.Dispatch<React.SetStateAction<string[]>>;
  content: (Directory | FileItem)[];
  setContent: React.Dispatch<React.SetStateAction<(Directory | FileItem)[]>>;
}

const fs = new FileSystem();

export const FileSystemContext = createContext<ContextProps | null>(null);

const FileSystemProvider: React.FC<FileSystemContextProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(["root"]);
  const [content, setContent] = useState(fs.content);

  return (
    <FileSystemContext.Provider
      value={{ fs, currentPath, setCurrentPath, content, setContent }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export default FileSystemProvider;
