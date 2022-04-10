import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProposal } from "../Components/customDao";
import ExecutionFields from "../Components/Elements/ExecutionFields";
import { getExecutionParams } from "../Components/execute";
import { getVerifiedExecutionContracts } from "../Components/ollieDao";
import { OllieDAOSc, TEMPCustomDAOSc } from "../network";

const Execute = () => {
  const { daoAddress } = useParams();
  const { proposalId } = useParams();
  const [executionParams, setExecutionParams] = useState();
  const [verifiedExecutionContracts, setVerifiedExecutionContracts] = useState(
    []
  );
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

  function submitHandler() {
    console.log("Data:");
    console.log(dynamicInputLUT);
  }

  useEffect(() => {
    async function fetchData() {
      //const response = await getVerifiedExecutionContracts(OllieDAOSc);
      const response2 = await getProposal(daoAddress, proposalId);
      const params = await getExecutionParams(response2.execution);
      //setVerifiedExecutionContracts(response);
      setProposal(response2);
      setExecutionParams(params);
      console.log(params);
      //console.log(response2);
    }
    fetchData();
  }, []);
  return (
    <div>
      Execute
      {executionParams ? (
        <ExecutionFields params={executionParams} inputHandler={inputHandler} />
      ) : (
        <Typography>Loading UI...</Typography>
      )}
      <Button onClick={submitHandler}>Submit</Button>
    </div>
  );
};
//TODO load all input fields (exe params)
export default Execute;
