import { Typography } from "@mui/material";
import React from "react";

const ProposalCard = (props) => {
  return (
    <div>
      <Typography variant="h3">{props.title}</Typography>{" "}
    </div>
  );
};

export default ProposalCard;
