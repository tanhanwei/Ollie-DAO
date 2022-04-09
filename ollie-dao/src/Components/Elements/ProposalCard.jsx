import { Button, Typography } from "@mui/material";
import React from "react";

const ProposalCard = (props) => {
  console.log(props.proposal.title);
  return (
    <div>
      <Typography variant="h3">{props.proposal.title}</Typography>
      <Typography variant="h4">{props.proposal.details}</Typography>
      <Typography variant="h5">{props.proposal.status}</Typography>
      <Button>Vote</Button>
      <Button>Execute</Button>
      <Button>Challenge</Button>
    </div>
  );
};

export default ProposalCard;
