import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getAllProposals, getDaoDetails } from "../Components/customDao";

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

  const loadDaoHandler = async () => {
    await getDaoDetails("0x9950Ac34f476D8648aB6FC4431e72FeCbffeBC7C");
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

      <Button onClick={loadDaoHandler}>Load Dao Details</Button>
    </div>
  );
};

export default Dao;
