import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getDaoDetails } from "../Components/customDao";

const Dao = () => {
  const { daoAddress } = useParams();

  const [dao, setDao] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await getDaoDetails(daoAddress);
      setDao(response);
      console.log(response);
    }
    fetchData();
  }, []);

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
    </div>
  );
};

export default Dao;
