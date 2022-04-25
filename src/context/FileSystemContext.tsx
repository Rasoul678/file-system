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
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: string | null;
  setModalType: React.Dispatch<React.SetStateAction<string | null>>;
  currentItem: Directory | FileItem | null;
  setCurrentItem: React.Dispatch<
    React.SetStateAction<Directory | FileItem | null>
  >;
}

const fs = new FileSystem();

export const FileSystemContext = createContext<ContextProps | null>(null);

const FileSystemProvider: React.FC<FileSystemContextProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(["root"]);
  const [content, setContent] = useState(fs.content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<Directory | FileItem | null>(
    null
  );

  return (
    <FileSystemContext.Provider
      value={{
        fs,
        currentPath,
        setCurrentPath,
        content,
        setContent,
        isModalOpen,
        setIsModalOpen,
        modalType,
        setModalType,
        currentItem,
        setCurrentItem,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export default FileSystemProvider;
