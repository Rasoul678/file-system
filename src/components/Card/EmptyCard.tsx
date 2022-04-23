import React from "react";
import Card from ".";
import Heading from "../Heading";

interface EmptyCardProps {}

const style = {
  width: "15rem",
  height: "10rem",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "1rem",
};

const EmptyCard: React.FC<EmptyCardProps> = () => {
  return (
    <Card bgColor="#1B1E20" style={style}>
      <Heading style={{textAlign: 'center'}} level={2}>Empty Directory</Heading>
    </Card>
  );
};

export default EmptyCard;
