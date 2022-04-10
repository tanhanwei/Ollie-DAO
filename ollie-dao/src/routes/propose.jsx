import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createProposal } from "../Components/proposal";
import { TEMPExecutionSc } from "../network";

const Propose = () => {
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const { daoAddress } = useParams();

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDetails = (event) => {
    setDetails(event.target.value);
  };

  const handleButtonClick = async () => {
    const response = await createProposal(
      daoAddress,
      title,
      details,
      "0",
      0,
      TEMPExecutionSc,
      0
    );
    console.log(response);
  };
  return (
    <Box>
      <Box>
        <Box sx={{ p: 10 }}>
          <TextField
            sx={{ width: 1000, margin: 3 }}
            required
            id="outlined-required"
            label="Proposal Title"
            onChange={handleChangeTitle}
          />
          <TextField
            sx={{ width: 1000, margin: 3 }}
            required
            id="outlined-multiline-static"
            label="Proposal Details"
            multiline
            rows={4}
            onChange={handleChangeDetails}
          />
          <Box>
            <Button
              onClick={handleButtonClick}
              variant="contained"
              sx={{ margin: 3 }}
            >
              Create Proposal
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Propose;
