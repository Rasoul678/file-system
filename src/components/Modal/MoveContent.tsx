import React, { useContext } from "react";
import { FileSystemContext } from "../../context/FileSystemContext";
import style from "styled-components";

interface MoveContentProps {}

const MoveContent: React.FC<MoveContentProps> = () => {
  const context = useContext(FileSystemContext);

  const fsCopy = context?.fs.copy;

  console.log(fsCopy);

  return (
    <div>
      {fsCopy?.currentDirectoryPath?.map((path: string, index: number) => (
        <StyledSpan key={index}>{path}</StyledSpan>
      ))}
    </div>
  );
};

const StyledSpan = style.span`
  background-color: #222;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
`;

export default MoveContent;
