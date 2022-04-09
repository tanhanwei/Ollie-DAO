import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Dao = () => {
  const { daoAddress } = useParams();
  return (
    <div>
      <Typography variant="h1">{daoAddress}</Typography>
      Dao address: {daoAddress}
    </div>
  );
};

export default Dao;
