import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getDaoDetails } from "../Components/customDao";
import { getAllProposals } from "../Components/proposal";

import { createProposal } from "../Components/proposal";
import { Box } from "@mui/system";
import ProposalCard from "../Components/Elements/ProposalCard";
import { getExecutionParams } from "../Components/execute";
import { TEMPExecutionSc } from "../network";

const Dao = () => {
  const { daoAddress } = useParams();

  const [dao, setDao] = useState();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getDaoDetails(daoAddress);
      const response2 = await getAllProposals(daoAddress);
      setDao(response);
      setProposals(response2);
      //console.log(response);
      //console.log(response2);
    }
    fetchData();
  }, []);

  const createProposalHandler = async () => {
    const response = await createProposal(
      daoAddress,
      "Stream Samuel.ETH at 0.0001ETH/sec",
      "He is our official solidity developer who works very hard for the company.",
      "0",
      200,
      TEMPExecutionSc,
      0
    );
    console.log(response);
  };

  const getExeParams = async () => {
    const response = await getExecutionParams(TEMPExecutionSc);
    console.log(response);
  };

  return (
    <div>
      {dao ? (
        <div>
          {" "}
          <Typography variant="h1">{dao.name}</Typography>
          <Typography variant="h6">{daoAddress}</Typography>
          <Typography variant="h2">{dao.funds}</Typography>
          <Typography variant="h2">{dao.admins}</Typography>
          <Typography variant="h2">{dao.proposals}</Typography>{" "}
          <Box bgcolor={"grey"}>
            {proposals.map((proposal) => (
              <ProposalCard proposal={proposal} daoContract={daoAddress} />
            ))}
          </Box>
        </div>
      ) : (
        <Typography variant="h2">Loading...</Typography>
      )}

      <Button onClick={createProposalHandler}>Create Proposal</Button>
      <Button onClick={getExeParams}>Get Exe Params</Button>
    </div>
  );
};

export default Dao;
