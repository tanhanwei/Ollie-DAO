import { Button, Card, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const ProposalCard = (props) => {
  console.log(props.proposal);
  const executionUrl =
    "/dao/" + props.daoContract + "/" + props.id + "/execute";
  return (
    <Box sx={{ p: 4, backgroundColor: "white" }}>
      <Paper sx={{ p: 10 }} elevation={3}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ p: 4 }}>
            <Typography variant="h4">{props.proposal.title}</Typography>
            <Typography variant="body1">{props.proposal.details}</Typography>
            <Typography variant="body1">{props.proposal.status}</Typography>
          </Box>

          <Button sx={{ p: 2, margin: 1, width: 150 }} variant="contained">
            Vote
          </Button>

          <Button sx={{ p: 2, margin: 1, width: 150 }} variant="contained">
            Challenge
          </Button>
          <Button sx={{ p: 2, margin: 1, width: 150 }} variant="contained">
            <Link
              to={"/dao/" + props.daoContract + "/" + props.id + "/execute"}
            >
              <Typography>Execute</Typography>
            </Link>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProposalCard;
