import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProposal } from "../Components/customDao";
import ExecutionFields from "../Components/Elements/ExecutionFields";
import {
  execute,
  getExecutionName,
  getExecutionParams,
} from "../Components/execute";
import { getVerifiedExecutionContracts } from "../Components/ollieDao";
import { OllieDAOSc, TEMPCustomDAOSc } from "../network";
import { ethers } from "ethers";
import { Box } from "@mui/system";

const Execute = () => {
  const { daoAddress } = useParams();
  const { proposalId } = useParams();
  const [executionContract, setExecutionContract] = useState();
  const [executionParams, setExecutionParams] = useState();
  const [executionName, setExecutionName] = useState();

  const [proposal, setProposal] = useState();

  let dynamicInputLUT = {
    BOOL: ["Nil"],
    UINT: ["Nil"],
    INT: ["Nil"],
    STRING: ["Nil"],
    ADDRESS: ["Nil"],
  };

  function inputHandler(TYPE, id) {
    return function (e) {
      const value = e.target.value;
      dynamicInputLUT[TYPE][id] = value;
    };
  }

  function typeFormat(data) {
    //BOOL
    for (let i = 0; i < data.BOOL.length; i++) {
      if (data.BOOL[i] != "Nil") {
        data.BOOL[i] == "True" ? (data.BOOL[i] = true) : (data.BOOL[i] = false);
      } else {
        data.BOOL[i] = false;
      }
    }
    //UINT
    for (let i = 0; i < data.UINT.length; i++) {
      if (data.UINT[i] != "Nil") {
        data.UINT[i] = parseInt(data.UINT[i]);
      }
    }
    //INT
    for (let i = 0; i < data.INT.length; i++) {
      if (data.INT[i] != "Nil") {
        data.INT[i] = parseInt(data.INT[i]);
      }
    }
    return data;
  }

  function submitHandler() {
    console.log("Data:");
    console.log(dynamicInputLUT);
    const param = typeFormat(dynamicInputLUT);

    execute(
      daoAddress,
      executionContract,
      param.BOOL,
      param.UINT,
      param.INT,
      param.STRING,
      param.ADDRESS,
      true,
      0
    );
  }

  useEffect(() => {
    async function fetchData() {
      //const response = await getVerifiedExecutionContracts(OllieDAOSc);
      const response2 = await getProposal(daoAddress, proposalId);
      const exeName = await getExecutionName(response2.execution);
      const params = await getExecutionParams(response2.execution);
      //setVerifiedExecutionContracts(response);
      setExecutionContract(response2.execution);
      setExecutionName(exeName);
      setProposal(response2);
      setExecutionParams(params);
      console.log(params);
      //console.log(response2);
    }
    fetchData();
  }, []);
  return (
    <Box sx={{ p: 8 }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="h1">{executionName}</Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5">Execution Contract Address: </Typography>
            <Typography variant="h5">{executionContract}</Typography>
          </Box>
        </Box>
      </Box>
      {executionParams ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <ExecutionFields
            params={executionParams}
            inputHandler={inputHandler}
          />
        </Box>
      ) : (
        <Typography>Loading UI...</Typography>
      )}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          sx={{ margin: 2, p: 2, width: 200 }}
          variant="contained"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Execute;
