import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProposal } from "../Components/customDao";
import ExecutionFields from "../Components/Elements/ExecutionFields";
import { execute, getExecutionParams } from "../Components/execute";
import { getVerifiedExecutionContracts } from "../Components/ollieDao";
import { OllieDAOSc, TEMPCustomDAOSc } from "../network";
import { ethers } from "ethers";

const Execute = () => {
  const { daoAddress } = useParams();
  const { proposalId } = useParams();
  const [executionContract, setExecutionContract] = useState();
  const [executionParams, setExecutionParams] = useState();

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
    console.log(typeFormat(dynamicInputLUT));
    console.log(Object.values(typeFormat(dynamicInputLUT)));

    const paramsLUT = ethers.utils.AbiCoder.prototype.encode(
      ["bool[]", "uint[]", "int[]", "string[]", "address[]"],
      [
        dynamicInputLUT.BOOL,
        dynamicInputLUT.UINT,
        dynamicInputLUT.INT,
        dynamicInputLUT.STRING,
        dynamicInputLUT.ADDRESS,
      ]
    );
    console.log(paramsLUT);

    execute(executionContract, paramsLUT, true, 0);
  }

  useEffect(() => {
    async function fetchData() {
      //const response = await getVerifiedExecutionContracts(OllieDAOSc);
      const response2 = await getProposal(daoAddress, proposalId);
      const params = await getExecutionParams(response2.execution);
      //setVerifiedExecutionContracts(response);
      setExecutionContract(response2.execution);
      setProposal(response2);
      setExecutionParams(params);
      console.log(params);
      //console.log(response2);
    }
    fetchData();
  }, []);
  return (
    <div>
      <Typography>Execution Contract Address:</Typography>
      <Typography>{executionContract}</Typography>
      {executionParams ? (
        <ExecutionFields params={executionParams} inputHandler={inputHandler} />
      ) : (
        <Typography>Loading UI...</Typography>
      )}
      <Button onClick={submitHandler}>Submit</Button>
    </div>
  );
};

export default Execute;
