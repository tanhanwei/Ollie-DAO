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
    <Box sx={{ p: 8 }}>
      {dao ? (
        <div>
          {" "}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h1">{dao.name}</Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ color: "grey" }} variant="body1">
                  {daoAddress}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ p: 2 }} variant="h5">
                  {dao.funds}
                </Typography>
                <Typography sx={{ p: 2 }} variant="h5">
                  {dao.admins}
                </Typography>
                <Typography sx={{ p: 2 }} variant="h5">
                  {dao.proposals}
                </Typography>{" "}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  sx={{ p: 2, width: 300, margin: 4 }}
                  variant="outlined"
                  onClick={createProposalHandler}
                >
                  Create Proposal
                </Button>
              </Box>
            </Box>
          </Box>
          <Box bgcolor={"grey"}>
            {proposals.map((proposal, index) => (
              <ProposalCard
                key={index}
                id={index}
                proposal={proposal}
                daoContract={daoAddress}
              />
            ))}
          </Box>
        </div>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h2">Loading...</Typography>
        </Box>
      )}

      <Button onClick={getExeParams}>Get Exe Params</Button>
    </Box>
  );
};

export default Dao;
