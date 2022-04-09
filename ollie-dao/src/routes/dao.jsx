import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getAllProposals, getDaoDetails } from "../Components/customDao";
import {
  getJSON,
  retrieveFiles,
  uploadTestFile,
} from "../Components/web3Storage";
import { createProposal } from "../Components/proposal";

const Dao = () => {
  const { daoAddress } = useParams();

  const [dao, setDao] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await getDaoDetails(daoAddress);
      const response2 = await getAllProposals(daoAddress);
      setDao(response);
      console.log(response);
      console.log(response2);
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
        </div>
      ) : (
        <Typography variant="h2">Loading...</Typography>
      )}

      <Button onClick={createProposalHandler}>Create Proposal</Button>
    </div>
  );
};

export default Dao;
