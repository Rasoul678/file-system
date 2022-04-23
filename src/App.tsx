import { useCallback, useContext, useRef, useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Heading from "./components/Heading";
import BackIcon from "./components/Icons/Back";
import Box from "./components/Other/Box";
import DirectoryContent from "./DirectoryContent";
import { FileSystemContext } from "./index";
import { Directory, FileItem } from "./utils/fileSystem";
import Modal from "./components/Modal";
import ModalContent from "./components/Modal/ModalContent";

const App = () => {
  const fs = useContext(FileSystemContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState<(Directory | FileItem)[]>([]);
  const [isShown, setIsShown] = useState(false);

  const handleCreateFolder = (name: string | undefined) => {
    if (name) {
      try {
        fs.createDirectory(name);
        setContent(fs.content);
        setIsShown(false);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileList = Array.from(files);

      fileList.forEach((file) => {
        fs.createFile(file.name, "", file);
      });
    }
    setContent(fs.content);

    e.target.value = "";
  };

  const closeModal = useCallback(() => setIsShown(false), []);

  return (
    <Box style={{ padding: "1.5rem" }}>
      <Modal
        isShown={isShown}
        hide={closeModal}
        modalContent={
          <ModalContent
            header="Create Folder"
            onCancel={closeModal}
            onSubmit={(text) => handleCreateFolder(text)}
          />
        }
      />
      <Heading>Media File System</Heading>
      <Card
        row
        style={{ padding: "1.5rem", marginBottom: "5rem" }}
        bgColor="#2D373D"
      >
        <Button
          title="Back"
          style={{ width: "1.2rem", borderRadius: "50%" }}
          onClick={() => console.log("go back")}
        >
          <BackIcon size={30} />
        </Button>
        <Box row>
          <Button
            title="Create Folder"
            style={{ padding: "1rem" }}
            onClick={() => setIsShown(true)}
          >
            create folder
          </Button>
          <Button
            title="Upload File"
            style={{ padding: "1rem" }}
            variant="primary"
          >
            <label style={{ cursor: "pointer" }}>
              upload file
              <input
                onChange={(e) => handleUploadFile(e)}
                ref={inputRef}
                type="file"
                accept="*/*"
                multiple
                style={{ display: "none" }}
              />
            </label>
          </Button>
        </Box>
      </Card>
      <DirectoryContent content={content} />
    </Box>
  );
};

export default App;
