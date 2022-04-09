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
      "0x2c6A9A4A096Ae6a265B70FF31Fb219B78bCBCBF4",
      "Send me money",
      "Once upon a tile I need those money",
      "0",
      200,
      "0x44fCE80b50Bf5414c24E56bCF5298d52dC6ed5DE",
      0
    );
    console.log(response);
  };

  const getExeParams = async () => {
    const response = await getExecutionParams(
      "0x0b49BC3184aBcfAA6b42ce80413e420769cf9b5a"
    );
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
