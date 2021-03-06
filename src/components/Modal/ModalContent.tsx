import React, { useState } from "react";
import Button from "../Button";
import Card from "../Card";
import Heading from "../Heading";
import Box from "../Other/Box";
import Input from "../Input";
import useKeyPress from "../../hooks/useKeyPress";

interface ModalContentProps {
  children?: React.ReactNode;
  header?: React.ReactNode | string;
  value?: string;
  onSubmit?: (text: string | undefined) => void;
  onCancel?: () => void;
}

const ModalContent: React.FC<ModalContentProps> = (props) => {
  const { header, value, onCancel, onSubmit, children } = props;
  const [inputValue, setInputValue] = useState(value || "");

  const handleSubmit = () => {
    onSubmit?.(inputValue);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  useKeyPress({ targetKey: "Enter", callback: handleSubmit });

  return (
    <Card bgColor="#676767" style={{ width: "25rem", height: "15rem" }}>
      {header && (
        <Heading level={2} style={{ textAlign: "center" }}>
          {header}
        </Heading>
      )}
      <Box column style={{ alignItems: "stretch", gap: "2rem" }}>
        {children ? (
          children
        ) : (
          <Box>
            <Input
              type="text"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Box>
        )}
        <Box row style={{ justifyContent: "center", gap: "7rem" }}>
          <Button style={{ backgroundColor: "#D13E39" }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button style={{ backgroundColor: "#56A844" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ModalContent;
